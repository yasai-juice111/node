SET CHARSET utf8;

/**
 * スタジオエリア
 */
CREATE TABLE IF NOT EXISTS studio_area (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_id       BIGINT(20)  UNSIGNED  NOT NULL  				  COMMENT 'スタジオID',
  name            varchar(255)          NOT NULL                  COMMENT '名前',
  address         varchar(255)          NOT NULL                  COMMENT '住所',
  tel		      BIGINT(20)          	NOT NULL                  COMMENT '電話番号',
  payment_method  varchar(255)          NOT NULL                  COMMENT '支払い方法',
  remark		  varchar(255)          NOT NULL                  COMMENT '備考',
  image_path      varchar(255)          NOT NULL                  COMMENT '画像パス',
  insert_datetime DATETIME 				NOT NULL				  COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  PRIMARY KEY (id),
  KEY (studio_id),
  KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリア';

insert into studio_area (studio_id, name, address, tel, payment_method, remark, image_path, insert_datetime, update_datetime) values (1, '渋谷店', '東京都渋谷区1-1', '09012345678', '現金のみ', 'なし', '/img/test001.jpg',now(), now());
insert into studio_area (studio_id, name, address, tel, payment_method, remark, image_path, insert_datetime, update_datetime) values (1, '恵比寿店', '東京都渋谷区1-2', '08012345678', '現金のみ', 'なし', '/img/test002.jpg',now(), now());
insert into studio_area (studio_id, name, address, tel, payment_method, remark, image_path, insert_datetime, update_datetime) values (2, '渋谷店', '東京都渋谷区2-1', '07012345678', '現金のみ', 'なし', '/img/test003.jpg',now(), now());
insert into studio_area (studio_id, name, address, tel, payment_method, remark, image_path, insert_datetime, update_datetime) values (3, '祐天寺店', '東京都目黒区1-1', '06012345678', '現金のみ', 'なし', '/img/test004.jpg',now(), now());