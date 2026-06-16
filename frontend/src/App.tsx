import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import StayPage from "./pages/StayPage";
import EventsPage from "./pages/EventsPage";
import StaticPage from "./pages/StaticPage";
import BookPage from "./pages/BookPage";
import BookSuccessPage from "./pages/BookSuccessPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="stay" element={<StayPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<StaticPage slug="gallery" />} />
        <Route path="policies" element={<StaticPage slug="policies" />} />
        <Route path="faq" element={<StaticPage slug="faq" />} />
        <Route path="book" element={<BookPage />} />
        <Route path="book/success" element={<BookSuccessPage />} />
      </Route>
    </Routes>
  );
}
