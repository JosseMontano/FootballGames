namespace server.Constants
{
    public static class Messages
    {
        public static class Auth
        
        {
            public static string FOUND { get; } = "Usuario obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el usuario";
            public static string CREATED { get; } = "Usuario registrado correctamente";
            public static string UPDATED { get; } = "Usuario actualizado exitosamente";
            public static string UPDATEDPASSWORD { get; } = "Contraseña actualizada exitosamente";
            public static string EXISTSUSERNAME { get; } = "Este nombre de usuario ya existe";
            public static string UNAUTHORIZED { get; } = "Las credenciales son inválidas";
            public static string ERRORCONFIG { get; } = "No se encontró la configuración para generar el token";
            public static string ERRORTOKEN { get; } = "Token inválido";
            public static string ERRORPASSWORDACTUAL { get; } = "La contraseña actual no coincide";
            public static string ERRORPASSWORDBODY { get; } = "Las contraseña nueva no coincide";
            public static string LOGINSUCESS { get; } = "Sesión iniciada correctamente";
        }
        
       
        public static class Divisions
        {
            public static string FOUND { get; } = "Divisiones obtenidas correctamente";
            public static string NOTFOUND { get; } = "No se encontró la division";
            public static string CREATED { get; } = "Division registrada correctamente";
            public static string UPDATED { get; } = "Division actualizada exitosamente";
            public static string DELETED { get; } = "Division eliminado exitosamente";
        }
       
        public static class Team
        {
            public static string FOUND { get; } = "Equipo obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el equipo";
            public static string CREATED { get; } = "Equipo registrado correctamente";
            public static string UPDATED { get; } = "Equipo actualizado exitosamente";
            public static string DELETED { get; } = "Equipo eliminado exitosamente";
        }

        public static class Player
        {
            public static string FOUND { get; } = "Jugador obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el jugador";
            public static string CREATED { get; } = "Jugador registrado correctamente";
            public static string UPDATED { get; } = "Jugador actualizado exitosamente";
            public static string DELETED { get; } = "Jugador eliminado exitosamente";
            public static string EXISTS { get; } = "El jugador ya esta registrado en otro equipo";
        }

        public static class Game
        {
            public static string FOUND { get; } = "Partido obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el partido";
            public static string CREATED { get; } = "Partido registrado correctamente";
            public static string LIMITTEAMS { get; } = "Ya paso el limite de equipos en el campeonato";
            public static string UPDATED { get; } = "Partido actualizado exitosamente";
            public static string DELETED { get; } = "Partido eliminado exitosamente";
        }

        public static class Championship
        {
            public static string FOUND { get; } = "Campeonato obtenido correctamente";
            public static string NOTFOUND { get; } = "No se encontró el campeonato";
            public static string CREATED { get; } = "Campeonato registrado correctamente";
            public static string UPDATED { get; } = "Campeonato actualizado exitosamente";
            public static string DELETED { get; } = "Campeonato eliminado exitosamente";
        }
    }
}