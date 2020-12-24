import {API} from '../config';
import moment from 'moment';
export const kaydol = (user) => {
    return fetch(`${API}auth/register`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    });
};

export const signin = (user) => {
    return fetch(`${API}auth/login`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    });
};

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const logout = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}auth/logout`,{
            method : "GET"
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
        }).catch(erro => {
            console.log(erro);
        });
    }
}

export const isAuthenticated = () => {
    if(typeof window === undefined){
        return false;
    }
    else {
        if(localStorage.getItem("jwt")){
            return JSON.parse(localStorage.getItem("jwt"));
        }
        else{
            return false;
        }
    }
};

export const getSolFrame = (page, limit) => {
    return fetch(`${API}basliklar/advanced?page=${page}&limit=${limit}`,{
        method : "GET"
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    })
};

export const getGenelAltincis = (token) => {
    return fetch(`${API}altincilar/`,{
        method : "GET",
        headers : {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    })
};

export const getSpecificAltinci = (token, name) => {
    return fetch(`${API}altincilar/byName/something/${name}`,{
        method : "GET",
        headers : {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    });
};


export const postBaslik = (token, baslik) => {
    return fetch(`${API}basliklar/`,{
        method : "POST",
        headers : {
            "Content-Type": "application/json", 
            Accept : "application/json",
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify(baslik)
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    });
};


export const updateBaslikPhoto = (token, formData, baslikId) => {
    return fetch(`${API}basliklar/${baslikId}/photo`,{
        method : "PUT",
        headers : { 
            Accept : "application/json",
            Authorization: `Bearer ${token}`
        },
        body : formData
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    });
};


export const getEntrylerToday = (page, limit, baslikId) => {
    const start = moment().subtract(2, "days");
    return fetch(`${API}entryler/advanced?baslik=${baslikId}&page=${page}&limit=${limit}&createdAt[gte]=${start}&sort=createdAt`,{
        method : "GET"
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    })
};

export const getEntrylerAllPaginated = (page, limit, baslikId) => {
    return fetch(`${API}entryler/advanced?baslik=${baslikId}&page=${page}&limit=${limit}&sort=createdAt`,{
        method : "GET"
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    })
};

export const postAnEntry = (token, baslik, icerik, ownerId) => {
    return fetch(`${API}entryler`,{
        method: "POST",
        headers : { 
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({baslik, ownerId, icerik})
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    });
};

export const postAnEntryFirst = (token, baslik, icerik, ownerId, first) => {
    return fetch(`${API}entryler`,{
        method: "POST",
        headers : { 
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({baslik, ownerId, icerik, first})
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    });
};

export const updateEntryPhoto = (token, formData, entryId, number) => {
    return fetch(`${API}entryler/${entryId}/photo?sayi=${number}`,{
        method : "PUT",
        headers : { 
            Accept : "application/json",
            Authorization: `Bearer ${token}`
        },
        body : formData
    }).then(res => {
        return res.json();
    }).then(data => {
        if(data){
            return data;
        }
    }).catch(error => {
        console.log(error);
    });
};


