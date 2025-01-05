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
    <button onClick={() => onClick()}>
      <CirclePlus className="min-h-7 min-w-7 hover:text-muted-foreground" />
    </button>
  );
}

export function RemoveConditionIcon({ onClick}) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()}>
      <CircleMinus className="min-h-4 min-w-4 bg-muted hover:text-muted-foreground" />
    </button>
  );
}

export function EditConditionIcon({ onClick}) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()}>
      <Pencil className="min-h-4 min-w-4 bg-muted hover:text-muted-foreground" />
    </button>
  );
}

export function EditIcon({ onClick}) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()}>
      <Pencil className="min-h-4 min-w-4 hover:text-muted-foreground" />
    </button>
  );
}

export function RemoveIcon({ onClick}) {
  if (!hasRole(['admin', 'clinicadmin', 'doctor'])) return null;
  return (
    <button onClick={() => onClick()}>
      <CircleMinus className="min-h-4 min-w-4 hover:text-muted-foreground" />
    </button>
  );
}




