import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import {getEntrylerAllPaginated, getEntrylerToday, isAuthenticated, postAnEntry, updateEntryPhoto} from '../auth/fetchop';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/editorjs';
import List from '@editorjs/editorjs';
import Embed from '@editorjs/editorjs';


const Entry = (props) => {
    let limit = 5;
    let domain = "http://localhost:5000/uploads/";
    const {user, token} = isAuthenticated();

    const [today, setToday] = useState("today");
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [entryler, setEntryler] = useState([]);
    const [error, setError] = useState(false);
    const [icerik, setIcerik] = useState("");
    const [countAll, setCountAll] = useState(0);
    const [photo1, setPhoto1] = useState(undefined);
    const [photo2, setPhoto2] = useState(undefined);
    const [photo3, setPhoto3] = useState(undefined);
    const [photo4, setPhoto4] = useState(undefined);

    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
            header: 
                {
                    class: Header,
                    inlineToolbar: ['link']
                },
            list:   {
                class: List,
                inlineToolbar: ['link', 'bold']
                },
            embed: {
                class: Embed,
                inlineToolbar: false,
                config: {
                    services: {
                        youtube: true,
                        coub: true
                    }
                }
            }
            

        }
    });

    useEffect(()=> {
        if(today === "today") {
            setEntryler([]);
            setPrevPage(0);
            setNextPage(0);
            getEntrylerToday(page, limit, props.baslik[0]).then(response => {
                if(response.success){
                    if(response.count_local === 0){
                        setToday("total");
                    }
                    else{
                        if(response.pagination.next){
                            setNextPage(response.pagination.next.page_);
                        }
                        if(response.pagination.prev){
                            setPrevPage(response.pagination.prev.page_);
                        }
                        setCountAll(response.count_all);
                        setEntryler(response.data);
                    }
                        
                }
                else {
                    return setError(response.error);
                }
                
            });
        } 
    },[props, page]);

    useEffect( () => {
         if(today === "total"){
             setEntryler([]);
             setNextPage(0);
             setPrevPage(0);
            getEntrylerAllPaginated(page, limit, props.baslik[0]).then(response => {
                if(response.success){
                    if(response.pagination.next){
                        setNextPage(response.pagination.next.page_);
                    }
                    if(response.pagination.prev){
                        setPrevPage(response.pagination.prev.page_);
                    }
                    setCountAll(response.count_all);
                    setEntryler(response.data);
                }
                else {
                    return setError(response.error);
                }
                
            });
        }

    },[today, props, page]);
    

    const icerikHandle = (event) => {
        const value = event.target.value;
        if(value){
            setIcerik(value);
        }
    };

    const handlePhoto = (event) => {
        if(event.target.files){
            if(event.target.files[0]){
                setPhoto1(event.target.files[0]);
            }
            if(event.target.files[1]){
                setPhoto2(event.target.files[1]);
            }
            if(event.target.files[2]){
                setPhoto3(event.target.files[2]);
            }
            if(event.target.files[3]){
                setPhoto4(event.target.files[3]);
            }
            
        }
    };

    const entryGirClick = async (event) => {
        event.preventDefault();
        let formData1 = "";
        if(photo1){
            formData1 = new FormData();
            formData1.append("file", photo1);
        }
        let formData2 = "";
        if(photo2){
            formData2 = new FormData();
            formData2.append("file", photo2);
        }
        let formData3 = "";
        if(photo3){
            formData3 = new FormData();
            formData3.append("file", photo3);
        }
        let formData4 = "";
        if(photo4){
            formData4 = new FormData();
            formData4.append("file", photo4);
        }
        const postedEntry = await postAnEntry(token, props.baslik[0], icerik, user._id);
        if(photo1){
            const updatedPhotoluEntry1 = await updateEntryPhoto(token, formData1, postedEntry.data._id, 1);
            console.log(updatedPhotoluEntry1);
            if(updatedPhotoluEntry1.success){
                setPhoto1(undefined);
            }
        }
        if(photo2){
            const updatedPhotoluEntry2 = await updateEntryPhoto(token, formData2, postedEntry.data._id, 2);
            console.log(updatedPhotoluEntry2);
            if(updatedPhotoluEntry2.success){
                setPhoto2(undefined);
            }
        }
        if(photo3){
            const updatedPhotoluEntry3 = await updateEntryPhoto(token, formData3, postedEntry.data._id, 3);
            console.log(updatedPhotoluEntry3);
            if(updatedPhotoluEntry3.success){
                setPhoto3(undefined);
            }
        }
        if(photo4){
            const updatedPhotoluEntry4 = await updateEntryPhoto(token, formData4, postedEntry.data._id, 4);
            console.log(updatedPhotoluEntry4);
            if(updatedPhotoluEntry4.success){
                setPhoto4(undefined);
            }
        }
    };

    const entryGir = () => (
        <div className="mt-3">
        <form>
            <div style={{"border" : "1px solid"}} id="editorjs"></div>
            <button onClick={entryGirClick} className="btn btn-primary mt-3">Entry gir</button>
        </form>
        </div>
    );

    const pagination = () => (
        <div style={{"width" : "90%", "display" : "flex", "justifyContent" : "center"}}>
            <span onClick={() => {
                if(page!==1){
                    setPage(1)
                }
            }} className="mr-3" style={{"cursor" : "pointer", "fontSize" : "2em"}}><i className="fas fa-angle-double-left"></i></span>
            <span onClick={() => {
                if(prevPage!==0){
                    setPage(prevPage);
                }
            }} className="mr-3" style={{"cursor" : "pointer", "fontSize" : "2em","color" : prevPage === 0 ? "#eff1f1" : "#05f9af"}}><i className="fas fa-arrow-left"></i></span>
            <span onClick={() => {
                if(nextPage!==0){
                    setPage(nextPage);
                }
                }
            } className="mr-3" style={{"cursor" : "pointer", "fontSize" : "2em", "color" : nextPage === 0 ? "#eff1f1" : "#05f9af"}}><i className="fas fa-arrow-right"></i></span>
            <span onClick={() => setPage(Math.ceil(countAll / limit))} className="mr-3" 
                style={{"cursor" : "pointer", "fontSize" : "2em"}}><i className="fas fa-angle-double-right"></i></span>
        </div>
    )
    ;

    return (
    <Fragment>
    <div style={{"width" : "90%", "textAlign" :"center"}}>
    <img style={{"maxHeight": "12rem"}} src={props.baslik[1] === "no-photo.jpg" ? "" : domain.concat(props.baslik[1])}/>
    </div>
    {entryler.map((entry, i) => 
    
    {
        let one_moment = moment(entry.createdAt);
        let one_moment_string = one_moment.toLocaleString();
        return(
        <div key={i} style={{"display" : "flex", "flexDirection" : "column", "width" : "80%", "borderBottom" :"1px solid"}}>
        <div style={{"display" : entry.photo1 !== "no-photo.jpg" ? "" : "none" ,"width" : "80%","marginTop" : "1em", "marginLeft" :"auto", "marginRight" :"auto"}}>
        <img style={{"maxWidth" : "100%"}} src={entry.photo1 === "no-photo.jpg" ? "" : domain.concat(entry.photo1)}/>
        </div>
        <div style={{"display" : entry.photo2 !== "no-photo.jpg" ? "" : "none" ,"width" : "80%", "marginTop" : "1em", "marginLeft" :"auto", "marginRight" :"auto"}}>
        <img style={{"maxWidth" : "100%"}} src={entry.photo2 === "no-photo.jpg" ? "" : domain.concat(entry.photo2)}/>
        </div>
        <div style={{"display" : entry.photo3 !== "no-photo.jpg" ? "" : "none" ,"width" : "80%","marginTop" : "1em", "marginLeft" :"auto", "marginRight" :"auto"}}>
        <img style={{"maxWidth" : "100%"}} src={entry.photo3 === "no-photo.jpg" ? "" : domain.concat(entry.photo3)}/>
        </div>
        <div style={{"display" : entry.photo4 !== "no-photo.jpg" ? "" : "none" , "width" : "80%","marginTop" : "1em", "marginLeft" :"auto", "marginRight" :"auto"}}>
        <img style={{"maxWidth" : "100%"}} src={entry.photo4 === "no-photo.jpg" ? "" : domain.concat(entry.photo4)}/>
        </div>
        <div className="mt-3 mb-3" style={{"width" : "100%"}}>
            {entry.icerik}
        </div>
        <div style={{"width" : "100%"}}>
    <div style={{"width" : "25%"}}><span>{entry.ownerId.nickname}</span></div>
    <div style={{"width" : "25%"}}><small>{one_moment_string.substring(4,15)}{" "}{one_moment_string.substring(16,21)}</small></div>
        </div>
        </div>
    )
    }

    )}
    {pagination()}
    <button style={{"display" : today === "today" ? "" : "none"}} type="button" className="btn btn-secondary" onClick={() => {setToday("total")}}>Bütün entryleri göster</button>
    {entryGir()}
    
    </Fragment>        
    );
};

export default Entry;
