SET CHARSET utf8;

/**
 * スタジオエリアルーム
 */
CREATE TABLE IF NOT EXISTS studio_area_room (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_area_id  BIGINT(20)  UNSIGNED  NOT NULL  				  COMMENT 'スタジオエリアID',
  name            varchar(255)          NOT NULL                  COMMENT '部屋名',
  price           varchar(255)          NOT NULL                  COMMENT '料金',
  room_size       varchar(255)          NOT NULL                  COMMENT '間取り',
  explanation     varchar(255)          NOT NULL                  COMMENT '説明',
  image_path      varchar(255)          NOT NULL                  COMMENT '画像パス',
  insert_datetime DATETIME 				NOT NULL				  COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  PRIMARY KEY (id),
  KEY (studio_area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリアルーム';

insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (1, '101号室', '25m', '3000 1h', 'なし', '/img/test001.jpg',now(), now());
insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (1, '102号室', '25m', '3000 1h', 'なし', '/img/test002.jpg',now(), now());
insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (1, '103号室', '25m', '3000 1h', 'なし', '/img/test002.jpg',now(), now());
insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (2, '101号室', '25m', '3000 1h', 'なし', '/img/test003.jpg',now(), now());
insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (2, '102号室', '25m', '3000 1h', 'なし', '/img/test003.jpg',now(), now());
insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (3, '101号室', '25m', '3000 1h', 'なし', '/img/test004.jpg',now(), now());
insert into studio_area_room (studio_area_id, name, price, room_size, explanation, image_path, insert_datetime, update_datetime) values (4, '101号室', '25m', '3000 1h', 'なし', '/img/test004.jpg',now(), now());