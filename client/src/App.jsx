import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./shared/pages/HomePage";
import Header from "./shared/components/Header";
import ExplorePage from "./movies/pages/ExplorePage";
import MovieDetailsPage from "./movies/pages/MovieDetailsPage";
import TheatreList from "./movies/pages/TheatreList";
import TheatreDetails from "./movies/pages/TheatreDetails";
import Signup from "./user/pages/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./user/pages/Login";
import AuthContext from "./auth/AuthContext";
import ProtectedRoutes from "./shared/protectedRoutes/ProtectedRoutes";
import Bookings from "./user/pages/Bookings";

const App = () => {
  return (
    <Router>
      <AuthContext>
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            {/* add protected routes here  */}
            <Route
              path="/book/:movieName/:movieId/theatres"
              element={<TheatreList />}
            />
            <Route path="/bookings" element={<Bookings />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/theatre/:theatreId/:movieId"
            element={<TheatreDetails />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </AuthContext>
    </Router>
  );
};
export default App;
