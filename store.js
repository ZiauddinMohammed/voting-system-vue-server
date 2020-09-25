module.exports.admins = [
  {
      name: "Roy",
      password: '12345678'
  }
]

module.exports.candidates = [
    {
      name: "John",
      password:'12345678',
      challengesSolved: 2,
      expertiseLevel: 4,
      skills: {
        datastructures: 4,
        algorithms: 5,
        cplusplus: 3,
        java: 4,
      },
      votes:0
    },
    {
      name: "Mark",
      password:'12345678',
      challengesSolved: 2,
      expertiseLevel: 4,
      skills: {
      },
      votes:0
    },
    {
      name: "Patrik",
      password:'12345678',
      challengesSolved: 2,
      expertiseLevel: 4,
      skills: {
        datastructures: 4
      },
      votes:0
    }
  ]

  module.exports.votes = [];
