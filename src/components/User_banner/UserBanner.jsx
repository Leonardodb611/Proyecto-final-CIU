import "./UserBanner.css";

export function UserBanner({ user }) {
  if (!user) {
    return (
      <div className="cargando">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="container-banner_profile">
      <div className="container-img_profile">
        <div className="img">
          <img
            src="https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg"
            alt=""
          />
        </div>
        <div className="banner-nickName">
          <h1>{user.nickName}</h1>
        </div>
      </div>
    </div>
  );
}
