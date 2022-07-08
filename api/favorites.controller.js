import FavoritesDAO from '../dao/favoritesDAO.js';

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
}