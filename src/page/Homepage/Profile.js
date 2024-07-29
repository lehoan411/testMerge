import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../Homepage/profile.css';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState({
        username: '',
        email: '',
        bio: '',
        img: '',
    });
    const [favoriteArticles, setFavoriteArticles] = useState([]);
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('https://api.realworld.io/api/user', {
                    headers: { Authorization: `Token ${token}` },
                });
                const userData = response.data.user;
                setUser({
                    username: userData.username,
                    email: userData.email,
                    bio: userData.bio,
                    img: userData.image,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }, []);

    const fetchFavoriteArticles = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`https://api.realworld.io/api/articles?favorited=${username}`, {
                    headers: { Authorization: `Token ${token}` },
                });
                setFavoriteArticles(response.data.articles || []); // Đảm bảo trả về mảng rỗng nếu không có dữ liệu
            } catch (error) {
                console.error('Error fetching favorite articles:', error);
            }
        }
    }, [username]);

    const fetchUserArticles = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`https://api.realworld.io/api/articles?author=${username}`, {
                    headers: { Authorization: `Token ${token}` },
                });
                setUserArticles(response.data.articles || []); // Đảm bảo trả về mảng rỗng nếu không có dữ liệu
            } catch (error) {
                console.error('Error fetching user articles:', error);
            }
        }
    }, [username]);

    const handleFavoriteClick = useCallback(async (slug) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post(
                    `https://api.realworld.io/api/articles/${slug}/favorite`,
                    null,
                    { headers: { Authorization: `Token ${token}` } }
                );

                if (response.data.article) {
                    setUserArticles(prevUserArticles =>
                        prevUserArticles.map(article =>
                            article.slug === slug
                                ? {
                                    ...article,
                                    favorited: response.data.article.favorited,
                                    favoritesCount: response.data.article.favoritesCount,
                                }
                                : article
                        )
                    );

                    setFavoriteArticles(prevFavoriteArticles =>
                        prevFavoriteArticles.map(article =>
                            article.slug === slug
                                ? {
                                    ...article,
                                    favorited: response.data.article.favorited,
                                    favoritesCount: response.data.article.favoritesCount,
                                }
                                : article
                        )
                    );
                }
            } catch (error) {
                console.error('Error favoriting article:', error);
            }
        }
    }, []);

    const handleUnfavoriteClick = useCallback(async (slug) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.delete(
                    `https://api.realworld.io/api/articles/${slug}/favorite`,
                    { headers: { Authorization: `Token ${token}` } }
                );

                if (response.data.article) {
                    setUserArticles(prevUserArticles =>
                        prevUserArticles.map(article =>
                            article.slug === slug
                                ? {
                                    ...article,
                                    favorited: response.data.article.favorited,
                                    favoritesCount: response.data.article.favoritesCount,
                                }
                                : article
                        )
                    );

                    setFavoriteArticles(prevFavoriteArticles =>
                        prevFavoriteArticles.filter(article => article.slug !== slug)
                    );
                }
            } catch (error) {
                console.error('Error unfavoriting article:', error);
            }
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchUserData();
        fetchFavoriteArticles();
        fetchUserArticles();
        setLoading(false);
    }, [fetchUserData, fetchFavoriteArticles, fetchUserArticles]);

    const formatDate = dateString => {
        const date = new Date(dateString);
        return format(date, 'MMMM d, yyyy');
    };

    return (
        <div style={{ fontFamily: 'source sans pro, sans-serif' }}>
            <div className='profileCt'>
                <div className='bgProfile'>
                    <div className='bgCt'>
                        <img src={user.img || "https://api.realworld.io/images/smiley-cyrus.jpeg"} alt="" />
                        <h4>{user.username}</h4>
                        <Link to="/setting">
                            <button className="btn btn-sm btn-outline-secondary">
                                <i className="ion-plus-round"></i> Follow {user.username}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='articles-toggle'>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">My Articles</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Favorited Articles</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                userArticles.length > 0 ? (
                                    <div>
                                        {userArticles.map(article => (
                                            <div className='article-preview border-top border-bottom' key={article.slug}>
                                                <div className='article-meta'>
                                                    <div className='author'>
                                                        <img className='rounded-circle' src={user.img || "https://api.realworld.io/images/smiley-cyrus.jpeg"} alt="avatar" />
                                                        <div className="info">
                                                            <Link to={`/profile/${article.author.username}`}>{article.author.username}</Link>
                                                            <p>{formatDate(article.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={`favorite-button btn btn-sm ${article.favorited ? 'btn-success' : 'btn-outline-success'}`}
                                                        onClick={() => {
                                                            if (article.favorited) {
                                                                handleUnfavoriteClick(article.slug);
                                                            } else {
                                                                handleFavoriteClick(article.slug);
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
                                                    </button>
                                                </div>
                                                <Link to={`/post/${article.slug}`} className='titles1'>{article.title}</Link>
                                                <Link to={`/post/${article.slug}`} className='article-description'>{article.description}</Link>
                                                <Link to={`/post/${article.slug}`} className='readm'>Read more...</Link>
                                                <ul className='article-tags'>
                                                    {article.tagList.map(tag => (
                                                        <li key={tag}>{tag}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No articles are here... yet.</p>
                                )
                            )}
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                favoriteArticles.length > 0 ? (
                                    <div>
                                        {favoriteArticles.map(article => (
                                            <div className='article-preview border-top border-bottom' key={article.slug}>
                                                <div className='article-meta'>
                                                    <div className='author'>
                                                        <img className='rounded-circle' src={user.img || "https://api.realworld.io/images/smiley-cyrus.jpeg"} alt="avatar" />
                                                        <div className="info">
                                                            <Link to={`/profile/${article.author.username}`}>{article.author.username}</Link>
                                                            <p>{formatDate(article.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={`favorite-button btn btn-sm ${article.favorited ? 'btn-success' : 'btn-outline-success'}`}
                                                        onClick={() => handleUnfavoriteClick(article.slug)}
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} /> {article.favoritesCount}
                                                    </button>
                                                </div>
                                                <Link to={`/post/${article.slug}`} className='titles1'>{article.title}</Link>
                                                <Link to={`/post/${article.slug}`} className='article-description'>{article.description}</Link>
                                                <Link to={`/post/${article.slug}`} className='readm'>Read more...</Link>
                                                <ul className='article-tags'>
                                                    {article.tagList.map(tag => (
                                                        <li key={tag}>{tag}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No favorite articles yet.</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
