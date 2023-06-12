import { Sequelize } from "sequelize";

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nick: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        recommend: {
          type: Sequelize.INTEGER, // 해시암호화를 할때 문자가 길어지니, 여유있게 용량을 잡아준다.
          allowNull: false, // 카카오 같은 api로 로그인할때, 직접 회원가입해서 비밀번호 설정한게 아니니 비번은 null일수도 있다.
        },
        deprecated: {
          type: Sequelize.INTEGER, // 해시암호화를 할때 문자가 길어지니, 여유있게 용량을 잡아준다.
          allowNull: false, // 카카오 같은 api로 로그인할때, 직접 회원가입해서 비밀번호 설정한게 아니니 비번은 null일수도 있다.
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, udaptedAt 자동 생성
        underscored: false,
        modelName: "Comment", // 모델명
        tableName: "comments", // 테이블명
        charset: "utf8", // 한글 입력 설정
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Post);
  }
}
