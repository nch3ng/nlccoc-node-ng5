import jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
import Config from "../../../config";

export var auth = {
  verifyToken: ( (req, res, next) => {
		let token = req.body.token || req.query.token || req.headers['x-access-token'];
		if( token ) {

			
			jwt.verify(token, Config.config.secret, (err, decoded) => {
				if(!decoded['isVerified']){
					return res.status(200).json({ success: false, verified: false, message: 'The user is not verified.' });   
				}
				if (err) {
						return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
				} else {
					// all good, continue
					req.decoded = decoded; 
					next();
				}
			});

		}  else {

				res.status(401).json({ success: false, message: 'No token exists.' });
				
		}
  })
}