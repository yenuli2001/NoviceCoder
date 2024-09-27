import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/layout/Header';
import Courses from './components/courses/Courses';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
import Contact from './components/contact/Contact';
import Request from './components/contact/Request';
import About from './components/about/About';
import Subscribe from './components/payment/Subscribe';
import PaymentSuccess from './components/payment/PaymentSuccess';
import PaymentFail from './components/payment/PaymentFail';
import NotFound from './components/payment/NotFound';
import CoursePage from './components/coursePage/CoursePage';
import Profile from './components/profile/profile';
import ChangePassword from './components/profile/ChangePassword';
import UpdateProfile from './components/profile/UpdateProfile';
import Dashboard from './components/admin/dashboard/Dashboard';
import CreateCourse from './components/admin/createCourses/Create';
import AdminCourse from './components/admin/adminCourses/AdminCourses';
import User from './components/admin/user/User';
import CodeEditor from './components/compiler/CodeEditor';
import Lobby from './components/webRTC/lobby';

import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { getProfile } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/layout/loader/Loader';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';

const codeEditorTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

const App = () => {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Toaster position="top-center" reverseOrder={false} />
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" Component={CoursePage} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request" element={<Request />} />

              <Route path="/lobby" element={<Lobby />} />

              <Route
                path="/code-editor"
                element={
                  <ChakraProvider theme={codeEditorTheme}>
                    <Box minH="100vh" bg="#2d1f41" color="white" px={6} py={8}>
                      <CodeEditor />
                    </Box>
                  </ChakraProvider>
                }
              />

              <Route
                path="/login"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/login"
                  >
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgetpassword"
                element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated}>
                    <ForgetPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resetpassword/:token"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/subscribe"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Subscribe />
                  </ProtectedRoute>
                }
              />
              <Route path="paymentsuccess" element={<PaymentSuccess />} />
              <Route path="paymentfail" element={<PaymentFail />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="changepassword"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updateprofile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes  */}

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/createcourse"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <AdminCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <User />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>
        )}
      </Router>
    </>
  );
};

export default App;
