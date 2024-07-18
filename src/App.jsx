import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CreatePost from "./pages/post/PostCreate";
import BodyHome from "./pages/home/BodyHome";
import DetailPost from "./pages/post/PostDetail";
function App() {
    return (
        <>
            <ToastContainer theme="light" autoClose={800} />
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route index element={<BodyHome />}></Route>
                    <Route path="*" element={<BodyHome />}></Route>
                    <Route path="post" element={<CreatePost />}></Route>
                    <Route path="post/:id" element={<DetailPost />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
