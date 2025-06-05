import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        
        if (!token) {
            return res.status(403).json({ message: "No se proporcionó token" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "No autorizado" });
    }
};

export const checkPerfil = (perfilesPermitidos) => {
    return (req, res, next) => {
        if (!perfilesPermitidos.includes(req.user.perfil)) {
            return res.status(403).json({ 
                message: "No tiene permisos para esta acción" 
            });
        }
        next();
    };
};