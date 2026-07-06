import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { APP_PATH } from '../../const';
import PageMain from '../../Pages/pageMain/PageMain';
import PageNotFound from '../../Pages/pageNotFound/pageNotFound';
import PageContacts from '../../Pages/pageContacts/PageContacts';
import PageLogin from '../../Pages/pageLogin/PageLogin';
import PageQuestBooking from '../../Pages/pageQuestBooking/PageQuestBooking';
import PageMyQuest from '../../Pages/pageMyQuest/PageMyQuest';
import PageQuest from '../../Pages/pageQuest/PageQuest';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getIsAuthLoading } from '../../store/selectors/selectors';
import { AppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { checkAuth } from '../../store/apiActions/apiActions';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(getIsAuth);
  const isAuthLoading = useSelector(getIsAuthLoading);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isAuthLoading) {
    return (
      <div className="loading-screen">
        <div className="container">
          <div className="loading">Проверка авторизации...</div>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={APP_PATH.PAGE_MAIN} element={<PageMain />} />
        <Route path={APP_PATH.PAGE_CONTACTS} element={<PageContacts />} />
        <Route path={APP_PATH.PAGE_QUEST} element={<PageQuest />} />
        <Route path={APP_PATH.PAGE_LOGIN} element={<PageLogin />} />

        <Route
          path={APP_PATH.PAGE_MYQUEST}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <PageMyQuest />
            </ProtectedRoute>
          }
        />
        <Route
          path={APP_PATH.PAGE_QUESTBOOKING}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <PageQuestBooking />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
