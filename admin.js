const {uniqueId} = require('lodash');
const router = require('express').Router();
const bodyParser = require('body-parser');
const {admins, candidates} = require('./store');
const adminSessions = [];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

function getDefaultCandidate() {
    return {
        name: "",
        password: "",
        challengesSolved: 0,
        expertiseLevel: 0,
        skills: {},
        votes:0,
    }
}

function login(payload){
    const admin = admins.find((admin)=>{
        return admin.name === payload.name && admin.password === payload.password;
    });
    if(admin) {
        candidateNames = [];
        candidates.forEach((candidate) => {
            candidateNames.push(candidate.name);
        });
        return candidateNames;
    }
    return admin;
}

router.post('/login', (req, res) => {
    const result = login(req.body);
    if(result){
        const Id = uniqueId();
        adminSessions.push(Id);
        result.adminSessionKey = Id;
        res.send(result);
    }
    else{
        res.status(404).send('Unauthorized User');
    }
})

router.post('/logout', (req, res) => {
    const data = req.body;
    if(data && adminSessions.includes(data.key)){
        adminSessions.splice(adminSessions.indexOf(data.key), 1);
    }
    else{
        res.status(500).send('Logout Failed');
    }
})

router.post('/delete', (req, res) => {
    const data = req.body;
    if(data && data.payload && adminSessions.includes(data.adminSessionKey)){
        const candidate = candidates.find((candidate) => { return candidate.name === data.payload.name});
        candidates.splice(candidates.indexOf(candidate), 1);
    }
    else{
        res.status(500).send('Unsuccessful Operation');
    }
})

router.put('/', (req, res) => {
    const data = req.body;
    if(data && data.payload && adminSessions.includes(data.adminSessionKey)){
        const newCandidate = Object.assign(getDefaultCandidate(), data.payload);
        candidates.push(newCandidate);
    }
    else{
        res.status(500).send('Unsuccessful Operation');
    }
})

module.exports = router;