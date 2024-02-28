--creacion de la tabla empleados

CREATE TABLE `employees` (
  `idEmployees` int NOT NULL AUTO_INCREMENT,
  `legajo` int NOT NULL,
  `apellido_nombre` varchar(255) NOT NULL,
  `DNI` int NOT NULL,
  `fec_nac` date DEFAULT NULL,
  `fec_ingreso` date DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `celular` varchar(12) DEFAULT NULL,
  `isDisabled` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idEmployees`,`legajo`),
  UNIQUE KEY `legajo_UNIQUE` (`legajo`),
  UNIQUE KEY `idEmployees_UNIQUE` (`idEmployees`),
  UNIQUE KEY `DNI_UNIQUE` (`DNI`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


--creacion de la tabla nomina