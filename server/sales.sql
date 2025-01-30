drop table if exists 商品データ;

create table 商品データ(
    商品名 text not null unique,
    金額 integer not null
);

drop table if exists 売上データ;

create table 売上データ(
    id serial primary key,
    商品名 text references 商品データ(商品名) on delete cascade,
    売上日 date not null,
    個数 integer not null
);

insert into
    商品データ (商品名, 金額)
values
    ('カヌレ', 400),
    ('フィナンシェ', 220);