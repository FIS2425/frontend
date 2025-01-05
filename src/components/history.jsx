import { CirclePlus, Pencil, CircleMinus } from 'lucide-react';

export function hasRole(roles) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || !userData.roles) return false;
  return roles.some(role => userData.roles.includes(role));
}

export function CardDiv({ children }) {
  return (
    <div className="flex items-center justify-between rounded-lg shadow-sm" >
      {children}
    </div>
  );
}

export function CardActions({ children }) {
  return (
    <div className="flex items-center space-x-3 ml-auto">
      {children}
    </div>
  );
}

export function AddIcon({ onClick }) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()} className="text-muted-foreground hover:text-primary">
      <CirclePlus className="min-h-7 min-w-7" />
    </button>
  );
}

export function RemoveIcon({ onClick}) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()} className="text-muted-foreground hover:text-primary">
      <CircleMinus className="min-h-4 min-w-4" />
    </button>
  );
}

export function EditIcon({ onClick}) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()} className="text-muted-foreground hover:text-primary">
      <Pencil className="min-h-4 min-w-4" />
    </button>
  );
}




