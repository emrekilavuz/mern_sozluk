import React, { Fragment, useEffect, useState } from 'react';
import {getGenelAltincis, isAuthenticated, getSpecificAltinci, postBaslik, updateBaslikPhoto, postAnEntryFirst} from '../auth/fetchop';

const BaslikAc = () => {

    const {user, token} = isAuthenticated();
    const [photoInput, setPhotoInput] = useState("");
    const [altincis, setAltincis] = useState([]);
    const [seciliAltinci, setSeciliAltinci] = useState("");
    const [showSpecificField, setShowShowSpecificField] = useState(false);
    const [altinciBySname, setAltinciBySname] = useState("");
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [icerik, setIcerik] = useState("");
    useEffect(() => {
        getGenelAltincis(token).then(res => {
            setAltincis(res.data);
            console.log(res.data);
        });
    },[]);

    const handleAltinciName = event => {
        const value = event.target.value;
        setAltinciBySname(value);
    };

    const handleTitle = event => {
        const value = event.target.value;
        if(value && value.length > 0){
            setTitle(value);
        }
    };

    const handleSelect = event=> {
        const value = event.target.value;
        if(value === "0"){
            setShowShowSpecificField(true);
        }
        else{
            setSeciliAltinci(value);
            setShowShowSpecificField(false);
        }
    };

    const showError = () => {
        return (<div className="alert alert-danger col-lg-6 mt-3" style={{display : error ? '' : 'none'}}>
            {error}
        </div>);
    };

    const handlePhoto = (event) => {
        if(event.target.files){
            const value = event.target.files[0];
            setPhotoInput(value);
        }
    };

    const icerikHandle = event => {
            setIcerik(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault();
        let formData = "";
        if(photoInput){
            formData = new FormData();
            formData.append("file", photoInput);
        }
        let altinciId = "";
        if(showSpecificField){
            const response = await getSpecificAltinci(token, altinciBySname);
            if(response.success === false){
                return setError("Kategori bulunamadı");
            }
            else{
                altinciId = response.data._id; 
            }
        }
        else {
            altinciId = seciliAltinci;
        }
        if(altinciId === undefined || altinciId === "" || altinciId === ""){
            return setError("Kategori seçilmedi");
        }
        else {
            const acilanBaslik = await postBaslik(token, {name : title, altinci : altinciId});
            console.log(acilanBaslik);
            const entry = await postAnEntryFirst(token, acilanBaslik.data._id, icerik, user._id, true);
            if(photoInput){
                const updatedPhotoluBaslik = await updateBaslikPhoto(token, formData, acilanBaslik.data._id);
                console.log(updatedPhotoluBaslik);
                if(updatedPhotoluBaslik.success){
                setTitle("");
                setIcerik("");
                }
            }
            else if(acilanBaslik.success && entry.success){
                setTitle("");
                setIcerik("");
            }
        
                
            
            }
    };

    return (
        <Fragment>
            {showError()}
            <div className="container">
                <h4>Başlık aç</h4>
            <form>
                <div className="form-group col-lg-8 mt-1">
                    <label className="text-muted">Başlık ismi</label>
                    <input value={title} onChange={handleTitle} type="text" className="form-control"/>
                </div>
                <div className="form-group col-lg-8 mt-1">
                    <label className="text-muted">Görsel dosyası seç</label>
                    <input className="form-control"
                onChange={handlePhoto}
                type="file"
                name="photo"
                accept="image/*"
              />
                </div>
                <div className="form-group col-lg-8 mt-1">
                    <label className="text-muted">Kategori seçiniz</label>
                    <br/>
                    <select onChange={handleSelect} style={{"width": "100%","padding" : ".5rem"}}>
                        <option value="00">Kategori seçiniz...</option>
                        <option value="0">Diğer</option>
                        {altincis.map((altinci, i) => (
                            <option key={i} value={altinci._id}>{altinci.name}</option>
                        )
                            
                        )}
                    </select>
                </div>

                <div className="form-group col-lg-8 mt-1" style={{"display" : showSpecificField === true ? "" : "none"}}>
                    <label className="text-muted">Kategoriyi yazınız</label>
                    <input type="text" className="form-control"
                    onChange={handleAltinciName}
                    />
                </div>
                <div className="form-group col-lg-8 mt-1">
                    <label className="text-muted">Entry metni</label>
                    <textarea onChange={icerikHandle} className="form-control" value={icerik} rows="6"></textarea>
                </div>
                <button type="button" className="btn btn-primary mt-3"
                onClick={handleClick}
                >Başlık aç</button>
            </form>
            </div>
            
        </Fragment>
    );
};

export default BaslikAc;