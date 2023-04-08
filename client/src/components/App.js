import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { AccountBox } from "../account/AccountBox";
import { UserContext } from "./UserContext";

import {Home} from "./Home";
import NavBar from "../navbar/NavBar";
import { Article } from "../articles/Article";
import { ArticleList } from "../articles/ArticleList";
import { DictionaryUpload } from "../dictionary/DIctionaryUpload";
import { ArticleEdit } from "../articles/ArticleEdit";

const USER_NOT_SET = -1;

function App() {

  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState("")
  const [user, setUser] = useState(USER_NOT_SET);
  const [chosen, setChosen] = useState([])
  const [target, setTarget] = useState("")
  const [errors, setErrors] = useState("")
  const [isLoading, setLoading] = useState(false)


  // ========= get articles =================================
  useEffect(() => {
    fetch('/articles')
        .then(res => res.json())
        .then(articles => setArticles(articles))
  }, [])

  
  // ========= check session - user remains logged in ========
  useEffect(() => {
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        console.log(r)
        r.json().then((user) => setUser(user));
      } else {
        setUser(null)
      }
    });
  }, []);
  

  // ========= add new article ===============================
  function handleNewText(newArticle) {
    setArticles([...articles, newArticle])
  }


  // ========= update article ===============================
  function onUpdatedArticle(updatedArticle) {
    // console.log(updatedArticle)
    const updatedArticles = articles?.map(a => {
      if (a.id === updatedArticle.id) {
          return updatedArticle
      } else {
        return a
      }
    })
    setArticles(updatedArticles)
  }

  // ========= user context value ============================
  const userContextValue = {user, setUser, 
                            article, setArticle, 
                            chosen, setChosen, 
                            errors, setErrors,
                            target, setTarget,
                            isLoading, setLoading,
                          }
   

  if(user === USER_NOT_SET) return;

  return (
    <UserContext.Provider value={userContextValue}>
      {!user ? 
        <AccountBox/> 
        :
        <main>
            <NavBar/>
            <Routes >
              <Route
                exact
                path='/article/edit/:id'
                element={<ArticleEdit onUpdatedArticle={onUpdatedArticle}/>}
              >
              </Route>
              <Route
                exact
                path='/upload_dictionary'
                element={<DictionaryUpload/>}
              >
              </Route>
              <Route
                exact
                path='/articles/:id'
                element={<Article key={article?.id}/>}
              >
              </Route>
              <Route
                exact
                path='/articles'
                element={<ArticleList articles={articles}/>}
              >
              </Route>

              <Route
                exact
                path='/login'
                element={<AccountBox/>}
              >
              </Route>

              <Route
                exact
                path='/'
                element={<Home onAddNewText={handleNewText}/>}
              >
              </Route>
          </Routes>

        </main>
      }
    </UserContext.Provider>
  );
}

export default App;