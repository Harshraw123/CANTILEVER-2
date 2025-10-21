export const BASE_URL =
	typeof window !== 'undefined' && window.location.hostname === 'localhost'
		? 'http://localhost:4000'
		: (import.meta.env.VITE_API_URL || 'https://ace-forge-ai-backend.vercel.app');
//change it later

export const API_PATHS = {
TASK:{
  CREATE:"/api/task/gp",
  UPDATE:(id)=>`/api/task/${id}/gp`,
  GETALL:'/api/task/gp',
  DELETE:(id)=>`/api/task/${id}/gp`
}
}
