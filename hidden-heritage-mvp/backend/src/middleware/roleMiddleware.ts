import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

/**
 * Role-based authorization middleware.
 * Must be used AFTER authenticateToken middleware.
 * 
 * Usage:
 *   router.get('/admin-only', authenticateToken, requireRole('admin'), handler);
 *   router.get('/specialists', authenticateToken, requireRole('admin', 'specialist'), handler);
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied: insufficient permissions',
        required: allowedRoles,
        current: req.user.role,
      });
    }

    next();
  };
};
