const {uniqueId} = require('lodash');
const router = require('express').Router();
const bodyParser = require('body-parser');
const {candidates} = require('./store');

const candidateSessions = [];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

function login(payload){
    const candidate = candidates.find((candidate)=>{
        return candidate.name === payload.name && candidate.password === payload.password;
    });
    if(candidate) {
        const candidateDetails = {}
        for(let field in candidate) {
            if(field !== 'password') {
                candidateDetails[field] = candidate[field];
            }
        }
        return candidateDetails;
    }
    return candidate;
}

router.post('/logout', (req, res) => {
    const data = req.body;
    if(data && candidateSessions.includes(data.key)){
        candidateSessions.splice(candidateSessions.indexOf(data.key), 1);
    }
    else{
        res.status(500).send('Logout Failed');
    }
})

router.post('/login', (req, res) => {
    const result = login(req.body);
    if(result){
        const Id = uniqueId();
        candidateSessions.push(Id);
        result.candidateSessionKey = Id;
        res.send(result);
    }
    else{
        res.status(404).send('Unauthorized User');
    }
})


router.post('/', (req, res) => {
    const data = req.body;
    if(data && data.payload && candidateSessions.includes(data.candidateSessionKey)){
        const candidate = candidates.find((candidate) => { return candidate.name === data.payload.name });
        candidates.splice(candidates.indexOf(candidate), 1);
        candidates.push(Object.assign(candidate, data.payload));
    }
    else{
        res.status(500).send('Unsuccessful Operation');
    }
})

module.exports = router;