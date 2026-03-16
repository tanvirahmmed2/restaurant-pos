

// async function getAuthenticatedUser() {
//     try {
//         await ConnectDB();
//         const cookieStore = await cookies(); 
//         const token = cookieStore.get('staff_token')?.value;

//         if (!token) return null;

//         const decoded = jwt.verify(token, JWT_SECRET);
//         const user = await Staff.findById(decoded.id).select("-password").lean(); 
//         return user || null;
//     } catch (error) {
//         return null;
//     }
// }