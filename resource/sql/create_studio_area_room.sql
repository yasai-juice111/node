SET CHARSET utf8;

/**
 * スタジオエリアルーム
 */
CREATE TABLE IF NOT EXISTS studio_area_room (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  studio_id       BIGINT(20)  UNSIGNED  NOT NULL  				  COMMENT 'スタジオID',
  studio_area_id  BIGINT(20)  UNSIGNED  NOT NULL  				  COMMENT 'スタジオエリアID',
  name            varchar(255)          NOT NULL                  COMMENT '部屋名',
  price           varchar(255)          NOT NULL                  COMMENT '料金',
  room_size       varchar(255)          NOT NULL                  COMMENT '間取り',
  explanation     varchar(255)          NOT NULL                  COMMENT '説明',
  image_path      varchar(255)          NOT NULL                  COMMENT '画像パス',
  insert_datetime DATETIME 				NOT NULL 				　COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  PRIMARY KEY (id),
  KEY (studio_id),
  KEY (studio_id, studio_area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオエリアルーム';