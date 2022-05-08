import {
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  useNavigate,
  useLocation,
  Outlet,
  useParams,
} from "react-router-dom";
import React from "react";
//?Link al tuto   https://www.youtube.com/watch?v=0cSVuySEB0A

//-Installs
/*  npx create-react-app frontend //si colonaron no tienen que poner esto copian index.js, index.html
  
      npm install //si clonaron ponen esto
      npm i react-router-dom
  */

//Navigate replace redirecciona
// no usamos <a> tags porque recarga toda la pagina en su lugar usamos Link
//outlet indica en qué parte de la pagina cargar algún componente
//useParams para hacer uso de :id parametros que se pasen en la url
//element={<>} lo que va aquí son los componentes que injectamos
//TEST ve al link courses/TuNombre   pon tu nombre allí, observa Courses() y CourseId()
//NavLink similar a useParams también te redirecciona
//useNavigate te puedes traer información de alguna pagina pasando el valor en el 2do argumento {state:"value"}, ver CourseId(), Dashboard()
//no tiene que ser un string {state: value} siempre
//Podemos usar Link en lugar de useNavigate, aqui el state siempre sera un string

export default function Router6() {
  return (
    <Routes>
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="courses" element={<Courses />}>
          <Route path=":courseId" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn component</h1>
      <h4>learn to learn</h4>
      <Link to="/learn/courses" className="btn btn-success">
        courses
      </Link>{" "}
      <Link to="/learn/bundles" className="btn btn-primary">
        bundle
      </Link>
      <Outlet />
    </div>
  );
}
function Courses() {
  const courseList = ["React", "Angula", "Vue", "Nodejs"];
  const ramdomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Curses list</h1>
      <h4>Courses card</h4>
      <hr />
      <h4>NavLink</h4>
      <NavLink
        to={`/learn/courses/${ramdomCourseName}`}
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "pink" : "",
          };
        }}
      >
        {ramdomCourseName}
      </NavLink>
      <NavLink to={`/learn/courses/💩`} className="btn btn-light">
        💩💩
      </NavLink>
      <Outlet />
      {/* autlet a CourseId() */}
    </div>
  );
}
function Bundles() {
  return (
    <div>
      <h1>Bundle list</h1>
      <h4>Bundle card</h4>
    </div>
  );
}
function CourseId() {
  const navigate = useNavigate();
  const { courseId } = useParams(); //!-courseId porque asi es como se puso en el Route
  return (
    <div>
      <h1>El parametro de la URL es: {courseId}</h1>
      <button
        onClick={() => {
          navigate("/dashboard", { state: "399" });
        }}
        className="btn btn-warning"
      >
        Price
      </button>
      <Link to="/dashboard" state={"StateFromLink"}>
        Test-Link
      </Link>
    </div>
  );
}
function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>La información que me traje es: {location.state} </h1>
      {/*state sera una string siempre*/}
    </div>
  );
}
