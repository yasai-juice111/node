DROP TABLE studio;

SET CHARSET utf8;

/**
 * スタジオ
 */
CREATE TABLE IF NOT EXISTS studio (
  id              BIGINT(20)  UNSIGNED  NOT NULL  AUTO_INCREMENT  COMMENT 'ID',
  name            varchar(255)          NOT NULL                  COMMENT '名前',
  login_id        varchar(255)          NOT NULL                  COMMENT 'ログインID',
  login_passward  varchar(255)          NOT NULL                  COMMENT 'ログインパスワード',
  email        	  varchar(255)          NOT NULL                  COMMENT 'email',
  insert_datetime DATETIME 				NOT NULL 			  	  COMMENT '作成日時',
  update_datetime DATETIME              NOT NULL                  COMMENT '更新日時',
  PRIMARY KEY (id),
  KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='スタジオ';

insert into studio (name, login_id, login_passward, email, insert_datetime, update_datetime) values ('Canary(キャナリー)', 'test','test','test@test.co.jp', now(), now());
insert into studio (name, login_id, login_passward, email, insert_datetime, update_datetime) values ('studio worcle', 'test','test','test@test.co.jp', now(), now());
insert into studio (name, login_id, login_passward, email, insert_datetime, update_datetime) values ('vintom', 'test','test','test@test.co.jp', now(), now());