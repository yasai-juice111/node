SET CHARSET utf8;

/**
 * スタジオエリア
 */
CREATE TABLE IF NOT EXISTS studio_area (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_id       BIGINT(20)  UNSIGNED  NOT NULL  				  COMMENT 'スタジオID',
  name            varchar(255)          NOT NULL                  COMMENT '名前',
  address         varchar(255)          NOT NULL                  COMMENT '住所',
  tel		      INT(10)          		NOT NULL                  COMMENT '電話番号',
  payment_method　varchar(255)          NOT NULL                  COMMENT '支払い方法',
  remark　		　varchar(255)          NOT NULL                  COMMENT '備考',
  image_path      varchar(255)          NOT NULL                  COMMENT '画像パス',
  insert_datetime DATETIME 				NOT NULL 				　COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  PRIMARY KEY (id),
  KEY (studio_id),
  KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリア';