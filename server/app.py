import psycopg
from flask import Flask, jsonify, request
from flask_cors import CORS

connection_args = {
    "host": "localhost",
    "dbname": "sales",
    "user": "postgres",
    "password": "password",
}


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
cors = CORS(app)


@app.route("/merchandise", methods=["GET"])
def get_merchandise():

    with psycopg.connect(**connection_args) as connection:
        sql = """select * from 商品データ;"""
        cursor = connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.route("/merchandise", methods=["POST"])
def post_merchandise():
    merchandise = request.json
    name = merchandise.get("name")
    amount = merchandise.get("amount")
    with psycopg.connect(**connection_args) as connection:
        sql = """insert into 商品データ(商品名,金額) values(%s,%s)"""
        cursor = connection.cursor()
        cursor.execute(sql, (merchandise, (name, amount)))
        connection.commit()
    return jsonify({"message": "商品データが登録されました"})


@app.route("/sales", methods=["GET"])
def get_sales():
    with psycopg.connect(**connection_args) as connection:
        sql = """SELECT * FROM 売上データ;"""
        cursor = connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchall()
    return jsonify(result)


@app.route("/sales", methods=["POST"])
def post_sales():
    data = request.json
    name = data.get("name")
    day = data.get("day")
    quantity = data.get("quantity")

    with psycopg.connect(**connection_args) as connection:
        sql = """INSERT INTO 売上データ (商品名, 売上日, 個数) VALUES (%s, %s, %s)"""
        cursor = connection.cursor()
        cursor.execute(sql, (name, day, quantity))
        connection.commit()

    return jsonify({"message": "売上データが登録されました"})


@app.route("/sales/monthly", methods=["GET"])
def get_monthly_sales():
    with psycopg.connect(**connection_args) as connection:
        sql = """
        SELECT
            DATE_TRUNC('month', 売上日) AS 売上月,
            SUM(個数 * 商品データ.金額) AS 月別売上合計
        FROM
            売上データ
        JOIN
            商品データ ON 売上データ.商品名 = 商品データ.商品名
        GROUP BY
            売上月
        ORDER BY
            売上月;
        """
        cursor = connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchall()

        formatted_result = [{"month": row[0], "total": row[1]} for row in result]
        return jsonify(formatted_result)


@app.route("/sales/<int:sale_id>", methods=["DELETE"])
def delete_sale(sale_id):
    with psycopg.connect(**connection_args) as connection:
        sql = """DELETE FROM 売上データ WHERE id = %s"""
        cursor = connection.cursor()
        cursor.execute(sql, (sale_id,))
        connection.commit()

    return jsonify({"message": "売上データが削除されました"})


@app.route("/products", methods=["POST"])
def add_product():
    data = request.json
    name = data["name"]
    price = data["price"]

    with psycopg.connect(**connection_args) as connection:
        sql = "INSERT INTO 商品データ (商品名, 金額) VALUES (%s, %s)"
        try:
            connection.execute(sql, (name, price))
            connection.commit()
        except psycopg.errors.UniqueViolation:
            return jsonify({"error": "商品名が既に存在します"}), 400

    return jsonify({"message": "商品が登録されました"})
