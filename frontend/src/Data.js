import Axios from 'axios';
const src = 'http://localhost:8081/'
export const GetCGMH = (Hos,Hoscode,Depthcode,Timecode) =>{
    return Axios({
        method:'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url:'4/'+Hos+'/'+Hoscode+'/'+Depthcode+'/'+Timecode
    }).then(data=>{
        return data.data
    }).catch(error =>{
        return{status:false}
    })
}

export const GetNTUH = (Hos,Hoscode,Depthcode,Timecode) =>{
    return Axios({
        method:'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url:'4/'+Hos+'/'+Hoscode+'/'+Depthcode+'/'+Timecode
    }).then(data=>{
        return data.data
    }).catch(error =>{
        return{status:false}
    })
}


export const GetTPREG = (Hos,Hoscode,Depthcode,Timecode) =>{
    return Axios({
        method:'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url:'4/'+Hos+'/'+Hoscode+'/'+Depthcode+'/'+Timecode
    }).then(data=>{
        return data.data
    }).catch(error =>{
        return{status:false}
    })
}

export const GetTVGH = (Hos,SectionID,SectionName) =>{
    return Axios({
        method:'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url:'3/'+Hos+'/'+SectionID+'/'+SectionName
    }).then(data=>{
        return data.data
    }).catch(error =>{
        return{status:false}
    })
}

export const GetClinic = (City,area,type,subject,page) =>{
    return Axios({
        method:'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url:'5/Clinic/'+City+'/'+area+'/'+type+'/'+subject+'/ '+'/'+page
    }).then(data=>{
        return data.data
    }).catch(error =>{
        return{status:false}
    })
}


export const GetClinicCurrent = (url) =>{
    return Axios({
        method:'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url:'Clinic_current'+url
    }).then(data=>{
        return data.data
    }).catch(error =>{
        return{status:false}
    })
}


