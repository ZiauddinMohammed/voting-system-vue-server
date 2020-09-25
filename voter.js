const router = require('express').Router();
const bodyParser = require('body-parser');
const expressip = require('express-ip');

const {candidates, votes} = require('./store');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressip().getIpInfoMiddleware);

router.get('/', (req, res) => {
    const candidateList = [];
    candidates.forEach((candidate) => {
        const candidateDetails = {};
        for(let field in candidate) {
            if(field !== 'password') {
                candidateDetails[field] = candidate[field];
            }
        }
        candidateList.push(candidateDetails);
    })
    res.send(candidateList);
})

router.get('/checkIp', (req, res) => {
    const ip = req.ip;
    const idx = votes.indexOf(ip);
    (idx>=0)? res.send(true): res.send(false);
})

router.post('/', (req, res) => {
    if(req.body){
        const ip = req.ip;
        const candidate = candidates.find((candidate) => { return candidate.name === req.body.name});
        candidate['votes'] = candidate['votes'] + 1;
        
        const idx = candidates.indexOf(candidate);
        candidates[idx] = candidate;
        votes.push(ip);
    }
    else{
        res.status(500).send('Unsuccessful Operation');
    }
})

module.exports = router;