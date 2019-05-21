function ratingByActiveYears(user) {
    let rating = user.yearsActive;

    if (user.yearsActive >= 5) {
        for (let year = user.yearsActive; year >= 5; year--) {
            if (year % 5 === 0) {
                rating += 2;
            }
        }
    }

    return rating
} 

function ratingByMembership(user) {
    if (user.membershipLevel === 'gold') {
        return 3
    }

    if (user.membershipLevel === 'silver') {
        return 2
    }

    if (user.membershipLevel === 'bronze') {
        return 1
    }

    return 0
}

function ratingByPlayedGames(user) {
    let rating = 0
    
    if (user.games.won) {
        rating += user.games.won * 3;
    }
    
    if (user.games.draw) {
        rating += user.games.draw;
    }
    
    if (user.games.lost) {
        rating -= user.games.lost;
    }
    
    if (user.games.forfeited) {
        if (user.membershipLevel !== 'gold') {
            rating -= user.games.forfeited * 2;
        }
    }

    return rating
}

export function getUserRating(user) {
  let rating = 0;
  
  rating += ratingByActiveYears(user);

  rating += ratingByMembership(user);

  rating += ratingByPlayedGames(user);

  return rating;
}