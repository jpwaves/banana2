import React from 'react'
import "./AdminDashboard.scss"
import { useState, useEffect } from "react";
import Axios from 'axios';
import BadgeList from '../badgeList/BadgeList';


export default function AdminDashboard() {
    const [removeMemeID, setRemID] = useState(0);
    const [viewMemeID, setViewID] = useState(0);
    const [img, setImg] = useState("");
    const [removeMessage, setRemMsg] = useState("");
    const [viewMessage, setViewMsg] = useState("");
    const [createImg, setCreateImg] = useState("");
    const [createImgType, setImgType] = useState("");
    const [createMessage, setCreateMsg] = useState("");
    const [createImageValid, setValid] = useState("");
    const [createImageCategory, setCreateCategory] = useState("");
    const [category, setCategory] = useState("");
    const [categoryArr, setCategoryArr] = useState();

    useEffect(() => {
        getCategory();
    });

    useEffect(() => {
        const cat = new Array();
        for (var c in category) {
            cat.push(category[c].name);
        }
        setCategoryArr(cat);
    }, [category]);


    const getCategory = () => {
        Axios.post("http://localhost:3001/getCategories")
            .then((res) => {
                setCategory(res.data.result);
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
    };


    const deleteMeme = () => {
        Axios.post("http://localhost:3001/deleteMeme", {
            memeId: removeMemeID,
        })
            .then((res) => {
                setRemMsg(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const createMeme = () => {
        setCreateMsg("Creating...");
        Axios.post("http://localhost:3001/createMeme", {
            imgUrl: createImg,
            type: createImgType,
            category: createImageCategory,
        })
            .then((res) => {
                setCreateMsg('Created!');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const addMeme = () => {
        const acceptedFileTypes = ['jpeg', 'jpg', 'png', 'tiff', 'tif', 'gif']
        setCreateMsg("");
        if (acceptedFileTypes.includes(createImgType)) {
            if (createImageValid) {
                if (categoryArr.includes(createImageCategory)) {
                    setCreateMsg("");
                    createMeme();
                }
                else {
                    setCreateMsg("Invalid category. Please choose one of the valid categories listed above.");
                }
            }
            else {
                setCreateMsg("Invalid image link.");
            }
        }

        else {
            setCreateMsg("Invalid file type. Please enter one of: 'jpeg', 'jpg', 'png', 'tiff', 'tif', 'gif'");
        }
    }

    const viewMeme = () => {
        Axios.post("http://localhost:3001/getMemeFromID", {
            memeId: viewMemeID,
        })
            .then((res) => {
                setViewMsg("");
                setImg(res.data.result);
            })
            .catch((err) => {
                setViewMsg("Meme ID " + viewMemeID + " does not exist!");
                setImg("");
                console.log(err);
            });
    }

    return (
        <div className="dash">
            <h2> Admin Dashboard </h2>
            <div className="viewMeme">
                <h3> Meme View </h3>
                {
                    viewMessage && <h4> {viewMessage} </h4>
                }
                <label for="view-id "> Meme ID </label>
                <input type="text" id="view-id" onChange={(event) => {
                    setViewID(event.target.value)
                }} />
                <button onClick={() => viewMeme()} id="viewMeme"> View Meme </button>
                <div className="imgContainer">
                    <img id="img" src={img} />
                </div>
            </div>
            <div className="delContainer">
                <h3> Deletion </h3>
                <label for="del-id "> Meme ID </label>
                <input type="text" id="del-id" onChange={(event) => {
                    setRemID(event.target.value)
                }} />
                <button onClick={() => deleteMeme()} id="delMeme"> Delete Meme </button>
                {
                    removeMessage && <h4> {removeMessage} </h4>
                }
            </div>
            <div className="createContainer">
                <h3> Create Meme </h3>
                <div className="categoryList">
                    <h5> Valid Categories: </h5>
                    <BadgeList badges={category} />
                </div>
                <label for id="link-id"> Image Link </label>
                <input type='text' id='link-id' onChange={(event) => {
                    setCreateImg(event.target.value);
                }}
                />
                <label for id="category"> Category </label>
                <input type='text' id='category' onChange={(event) => {
                    setCreateCategory(event.target.value);
                }}
                />

                <label for id="link-id"> Image File Type </label>
                <input type='text' id='image-type' onChange={(event) => {
                    setImgType(event.target.value);

                }}
                />

                <button onClick={() => addMeme()} id="addMeme"> Create Meme </button>
                <div className='imgContainer'>
                    {
                        createMessage && <h4> {createMessage} </h4>
                    }

                    <img id='new-img' src={createImg} onError={() => {
                        setValid(false);
                        setCreateImg("");

                    }} onLoad={() => {
                        setCreateMsg("");
                        setValid(true);
                    }} />

                </div>
            </div>
        </div>
    )
}

