SET CHARSET utf8;

/**
 * スタジオ
 */
CREATE TABLE IF NOT EXISTS studio (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  name            varchar(255)          NOT NULL                  COMMENT '名前',
  insert_datetime DATETIME 				      NOT NULL 					        COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  PRIMARY KEY (id),
  KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオ';