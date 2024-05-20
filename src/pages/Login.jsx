import { LoginForm } from "../components";
import MainImg from "../assets/images/connection.jpg";
const Login = () => {
  return (
    <section className="authentification">
      <div className="content-box">
        <LoginForm />
      </div>
      <div className="img-box">
        <img src={MainImg} />
        <div className="text-content">
          <div className="text-header">
            <h2>exploring the best community for your projects realisation</h2>
          </div>
          <div className="text-paragraph">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium incidunt architecto inventore illo fuga? Nisi est nemo
              quod repellat distinctio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
