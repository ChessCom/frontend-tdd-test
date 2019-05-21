import { getUserRating } from '../src/index';

// create a user with years an an active player
// games won, lost, draw
const createUser = (user = {}, games = {}) => {
  return Object.assign({
    username: 'chessman',
    yearsActive: 0,
    membershipLevel: 'free', // bronze, silver, gold
  },
  user,
  {
    games: Object.assign({
      won: 0,
      lost: 0,
      draw: 0,
      forfeited: 0,
    }, games),
  });
}

describe('getUserRating', () => {
  describe('Default functionality', () => {
    it('should return 0 if the user has no games, yearsActive, and has free membership', () => {
      const user = createUser();
  
      expect(getUserRating(user)).toEqual(0);
    });
  });

  describe('test score based on yearsActive', () => {
    it('a user should get 1 point for the first year active', () => {
      const user = createUser({
        yearsActive: 1,
      });
  
      expect(getUserRating(user)).toEqual(1);
    });

    it('a user should get 7 points for the first 5 years active', () => {
        const user = createUser({
          yearsActive: 5,
        });
    
        expect(getUserRating(user)).toEqual(7);
    });

    it('a user should get 8 points for the first 6 years active', () => {
        const user = createUser({
          yearsActive: 6,
        });
    
        expect(getUserRating(user)).toEqual(8);
    });

    it('a user should get 37 points for the first 27 years active', () => {
        const user = createUser({
          yearsActive: 27,
        });
    
        expect(getUserRating(user)).toEqual(37);
    });
  });

  // membership status
  describe('test score based on membershipLevel', () => {
    it('should return 1 point for a user with a bronze membership', () => {
      const user = createUser({
        membershipLevel: 'bronze',
      });
       
      expect(getUserRating(user)).toEqual(1);
    });

    it('should return 2 points for a user with a silver membership', () => {
      const user = createUser({
        membershipLevel: 'silver',
      });
       
      expect(getUserRating(user)).toEqual(2);
    });

    it('should return 3 points for a user with a gold membership', () => {
      const user = createUser({
        membershipLevel: 'gold',
      });
       
      expect(getUserRating(user)).toEqual(3);
    });
  });
  

  describe('test score based on games', () => {
    it('should return 21 points for a user who won 7 games', () => {
        const user = createUser({}, {
            won: 7
        })

        console.log(user)

        expect(getUserRating(user)).toEqual(21);
    })

    it('should return 14 points for a user who have 14 draws', () => {
        const user = createUser({}, {
            draw: 14
        })

        expect(getUserRating(user)).toEqual(14);
    })

    it('should return -5 points for a user who lost 5 games', () => {
        const user = createUser({}, {
            lost: 5
        })

        expect(getUserRating(user)).toEqual(-5);
    })

    it('should return -10 points for a user who forfeited 5 games', () => {
        const user = createUser({}, {
            forfeited: 5
        })

        expect(getUserRating(user)).toEqual(-10);
    })

    it('should return 0 points for a user who forfeited 5 games but is a gold member', () => {
        const user = createUser({
            membershipLevel: 'gold'
        }, {
            forfeited: 5
        })

        expect(getUserRating(user)).toEqual(0);
    })
  });
  
  // new feature
  it.skip('give 1 extra point per 10 games played', () => {
    const user = createUser({}, {
      won: 3, // 9 points
      lost: 1, // -1 point 
      draw: 6, // + 6
    }); // + 1 for 10 games
     
    expect(getUserRating(user)).toBe(15);
  });
});