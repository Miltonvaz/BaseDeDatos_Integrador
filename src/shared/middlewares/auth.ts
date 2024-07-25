import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../User/repositories/UserRepository';
import { UserPayload } from '../config/types/userPayload';
import { AuthRequest } from '../config/types/authRequest';

const secretKey = process.env.SECRET || '';

const errorMessages = {
  noToken: 'No token provided',
  invalidToken: 'Invalid token',
  tokenExpired: 'Token expired',
  unauthorized: 'Unauthorized access'
};

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: errorMessages.noToken });
  }

  try {
    const payload = jwt.verify(token, secretKey) as UserPayload;
    console.log('Token payload:', payload);
    const user = await UserRepository.findById(payload.user_id);

    if (!user) {
      console.log('User not found for token:', payload.user_id);
      return res.status(401).json({ message: errorMessages.invalidToken });
    }

    req.userData = payload;
    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.log('Token expired:', error);
      return res.status(401).json({ message: errorMessages.tokenExpired });
    }
    console.log('Token verification error:', error);
    return res.status(401).json({ message: errorMessages.unauthorized });
  }
};

export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userData) {
      console.log('User data not found in request');
      return res.status(401).json({ message: errorMessages.unauthorized });
    }

    try {
      const user = await UserRepository.findById(req.userData.user_id);

      if (!user) {
        console.log('User not found for ID:', req.userData.user_id);
        return res.status(401).json({ message: errorMessages.unauthorized });
      }

      const userRoleName = getUserRoleName(user.role_id_fk);

      if (!userRoleName || !allowedRoles.includes(userRoleName)) {
        console.log('User role:', userRoleName, 'Allowed roles:', allowedRoles);
        return res.status(403).json({ message: 'Forbidden' });
      }

      return next();
    } catch (error) {
      console.log('Authorization error:', error);
      return res.status(401).json({ message: errorMessages.unauthorized });
    }
  };
};

function getUserRoleName(role_id_fk?: number): string | null {
  if (role_id_fk === undefined) {
    return null;
  }
  switch (role_id_fk) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Empleado';
    case 3:
      return 'Usuario';
    default:
      return null;
  }
}
