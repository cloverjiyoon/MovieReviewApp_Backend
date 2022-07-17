import FavoritesDAO from '../dao/favoritesDAO.js';
import MoviesDAO from '../dao/moviesDAO.js';
import MoviesController from './movies.controller.js';

export default class FavoritesController {
    static async apiUpdateFavorites(req, res, next){
        console.log('API update favorite');
        try{
            const FavoritesResponse = await FavoritesDAO.updateFavorites(
                req.body._id,
                req.body.favorites
            )

            var {error} = FavoritesResponse
            if(error) {
                res.status(500).json({error});
            }

            if(FavoritesResponse.modifiedCount === 0 && !FavoritesResponse.upsertedId){
                throw new Error("Unable to update favorites.")
            }
            res.json({status: "success "});
        } catch(e){
            res.status(500).json({ error:e.message })
        }
    }

    static async apiGetFavorites(req, res, next){
        console.log('API get favorite');
        try{
            let id = req.params.userId;
            let favorites = await FavoritesDAO.getFavorites(id);
            if(!favorites){
                res.status(404).json({ error: "not found"});
                return;
            }
            res.json(favorites);
        } catch(e){
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }

    
    static async apiGetFavoritesCards(req, res, next){
        console.log('API get Favorite Card');
        try{
            let id = req.params.userId;
            let favorites = await FavoritesDAO.getFavorites(id);
            if(!favorites){
                res.status(404).json({ error: "not found"});
                return;
            }

            let cards = [];
            i = 1;
            favorites.map( async (movie_Id) => {
                // get each movie info by ID
                const movie = await MoviesDAO.getMovieById(movie_Id);

                // create each card info
                const favoritecard = {
                    _id: i,
                    movieId: movie_Id,
                    poster: movie.poster,
                    title: movie.title
                }
    
                i += 1;

                // add each favorite card to cards SET
                cards = [...cards, favoritecard];

                // getMoviebyId(movie_Id)
                //build card, put card in cards
                 //let Card ={
                //_id: user.googleId;
                // poster: ?
                // title: ?
                //..

                //return cards.

                //Card
                //cards = {...cards, Card}
            //}
            })

            //return cards
            res.json(cards);


        } catch(e){
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }






}