--BASE DE DATOS TALLER MECANICO MYM

CREATE DATABASE MYM_DB
GO

USE MYM_DB;
GO

--CREAR USUARIO (para conexion)

CREATE LOGIN MYM_User WITH PASSWORD = 'T4ll3RMyM-';
go

--************  TABLAS  ***********--

-- MODULO ADMINISTRATIVO --

CREATE TABLE USUARIO(

    idUsuario INT IDENTITY(1,1) PRIMARY KEY,
    nombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    cedula VARCHAR(10) NOT NULL UNIQUE,
    contrasenaHash VARBINARY(256) NOT NULL,
    estadoCuenta BIT DEFAULT 1 NOT NULL, --activo, bloquedo
	intentosFallidos INT DEFAULT 5 NOT NULL,

    fechaRegistro DATE DEFAULT GETDATE(),--al crear cuenta
    fechaUltimaSesion DATE NOT NULL, --cada vez que hace login

)
GO

CREATE TABLE HISTORIAL_CONTRASENA(

    idHistorialContrasena INT IDENTITY(1,1) PRIMARY KEY,
    fechaUltimoCambio DATE NOT NULL,

    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario) ON DELETE CASCADE

)
GO

CREATE TABLE USUARIO_BLOQUEADO(

    idBloqueo INT IDENTITY(1,1) PRIMARY KEY,
    fechaBloqueo DATETIME NOT NULL,
    motivo VARCHAR(500) NOT NULL,

    --dependiendo del motivo, cambia el tiempo de bloqueo
    fechaDesbloqueo AS 
        CASE 
            WHEN motivo = 'Contrasena' THEN DATEADD(MINUTE, 30, fechaBloqueo) --30min
            WHEN motivo = 'Inactividad' THEN NULL --tiempo indefinido
            ELSE NULL
        END PERSISTED,

    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario) ON DELETE CASCADE
)
GO

CREATE TABLE ROL(

    idRol INT IDENTITY(1,1) PRIMARY KEY,
    rol VARCHAR(30) NOT NULL,
    permisoAcceder BIT NOT NULL DEFAULT 0,
    permisoVisualizar BIT NOT NULL DEFAULT 0,
    permisoAgregar BIT NOT NULL DEFAULT 0,
    permisoConsultar BIT NOT NULL DEFAULT 0,
    permisoModificar BIT NOT NULL DEFAULT 0,
    permisoGenerar BIT NOT NULL DEFAULT 0,

    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)

)
GO
-- MODULO TRABAJADORES --

CREATE TABLE TRABAJADOR(

    idTrabajador INT IDENTITY(1,1) PRIMARY KEY,
    nombreCompleto VARCHAR(200) NOT NULL,
    cedula VARCHAR(10) NOT NULL UNIQUE,
    salario DECIMAL(10,2) NOT NULL,
    seguroSocial VARCHAR(50) NOT NULL,

)
GO

CREATE TABLE HORARIO(

    idHorario INT IDENTITY(1,1) PRIMARY KEY,
    dias VARCHAR(100) NOT NULL,
    horaInicio VARCHAR(25) NOT NULL,
    horaFin VARCHAR(25) NOT NULL,

    --FK
    idTrabajador INT NOT NULL,
    FOREIGN KEY (idTrabajador) REFERENCES TRABAJADOR(idTrabajador) ON DELETE CASCADE

)
GO

CREATE TABLE VACACIONES(

    idVacaciones INT IDENTITY(1,1) PRIMARY KEY,
    solicitud VARCHAR(50) DEFAULT'en espera' NOT NULL,--en espera, rechazado, aceptado
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    
    motivoRechazo NVARCHAR(1000) NULL,

    idTrabajador INT NOT NULL,
    FOREIGN KEY (idTrabajador) REFERENCES TRABAJADOR(idTrabajador) ON DELETE CASCADE

)
GO

CREATE TABLE HISTORIAL_SALARIO(

    idHistorialSalario INT IDENTITY(1,1) PRIMARY KEY,
    fecha DATE NOT NULL,

    salarioBase DECIMAL(10,2) NOT NULL,
    bonificaciones DECIMAL(10,2) NULL,
    horasExtra DECIMAL(5,2) NULL,
    tarifaPorHoraExtra DECIMAL(10,2) NULL,

    --columnas calculadas
    totalHorasExtra AS ISNULL(tarifaPorHoraExtra * horasExtra, 0) PERSISTED,
    totalNeto AS salarioBase + ISNULL(bonificaciones, 0) + ISNULL(tarifaPorHoraExtra * horasExtra, 0) PERSISTED,

    --fk
    idTrabajador INT NOT NULL,
    FOREIGN KEY (idTrabajador) REFERENCES TRABAJADOR(idTrabajador) ON DELETE CASCADE

)
GO

CREATE TABLE ASISTENCIA_DIARIA(

    idAsistencia INT IDENTITY(1,1) PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,

    --FK
    idTrabajador INT NOT NULL,
    FOREIGN KEY (idTrabajador) REFERENCES TRABAJADOR(idTrabajador) ON DELETE CASCADE

)
GO

CREATE TABLE JUSTIFICACION_ASISTENCIA(

    idJustificacion INT IDENTITY(1,1) PRIMARY KEY,
    fecha DATE NOT NULL,
    detalles NVARCHAR(MAX)NOT NULL,

    --FK
    idTrabajador INT NOT NULL,
    FOREIGN KEY (idTrabajador) REFERENCES TRABAJADOR(idTrabajador) ON DELETE CASCADE

)
GO

-- MODULO CLIENTES --

CREATE TABLE CLIENTE(

    idCliente INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cedula VARCHAR(10) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    fechaRegistro DATE NOT NULL

)
GO

CREATE TABLE CLIENTE_VEHICULO(

    idVehiculo INT IDENTITY(1,1) PRIMARY KEY,
    placaVehiculo VARCHAR(20) NOT NULL UNIQUE,
    modeloVehiculo VARCHAR (100) NOT NULL,
    marcaVehiculo VARCHAR (50) NOT NULL,
    annoVehiculo INT NOT NULL,
    tipoVehiculo VARCHAR(30) NOT NULL,

    idCliente INT NOT NULL
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente) ON DELETE CASCADE

)
GO

-- MODULO INVENTARIO --

CREATE TABLE CATEGORIA(
    idCategoria INT IDENTITY(1,1) PRIMARY KEY,
    nombreCategoria VARCHAR(100) NOT NULL
)
GO

CREATE TABLE PROVEEDOR(
    idProveedor INT IDENTITY(1,1) PRIMARY KEY,
    nombreProveedor VARCHAR(100) NOT NULL
)
GO

CREATE TABLE MARCA_PRODUCTO(
    idMarca INT IDENTITY(1,1) PRIMARY KEY,
    nombreMarca VARCHAR(100) NOT NULL
)
GO

CREATE TABLE VEHICULOS_COMPATIBLES(
    idVehiculos INT IDENTITY(1,1) PRIMARY KEY,
    modelo VARCHAR (100) NOT NULL,
)
GO

CREATE TABLE INV_REPUESTO_SOLICITUD(
    idSolicitud INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    cuerpo NVARCHAR(2048) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    fecha DATE DEFAULT GETDATE() NOT NULL,
    aprobado BIT NULL
);
GO

--producto o servicio
CREATE TABLE PRODUCTO_SERVICIO(

    idProducto INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    descripcion NVARCHAR(MAX) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    fechaIngreso DATE NOT NULL,
    ubicacionAlmacen VARCHAR(100) NOT NULL,
    proveedor VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    vehiculosCompatibles NVARCHAR(MAX) NOT NULL,--array

    tipo VARCHAR(50) NOT NULL, --SERVICIO O PRODUCTO
    img NVARCHAR(255) NULL,

    -- Opcional - Descuentos
    porcentajeDescuento DECIMAL(10,2) NULL,
    fechaInicio DATETIME NULL,
    fechaFin DATETIME NULL,
)
GO

CREATE TABLE AUDITORIA_TABLAS(

    idAuditoria INT IDENTITY(1,1) PRIMARY KEY,
    tipo CHAR(1) NOT NULL,
    tabla VARCHAR(50) NOT NULL,
    registro INT,
	campo VARCHAR(50),
	valorAntes VARCHAR(100),
	valorDespues VARCHAR(100),
	fecha DATETIME,
    usuario VARCHAR(50),
	PC VARCHAR(50)
);
GO

-- MODULO FINANZAS --

CREATE TABLE PAGO_CLIENTE(

    idPago INT IDENTITY(1,1) PRIMARY KEY,
    monto DECIMAL(10,2) NOT NULL,
    metodoPago VARCHAR(100),
    fecha DATETIME NOT NULL,
    estado VARCHAR(50),--cancelado, pendiente, atrasado
    descripcion NVARCHAR(MAX) NOT NULL,

    FOREIGN KEY (idVenta) REFERENCES VENTA(idVenta)
    idCliente INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente),

)
GO

CREATE TABLE GASTO_OPERATIVO(

    idGastoOperativo INT IDENTITY(1,1) PRIMARY KEY,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATETIME NOT NULL,
    idProveedor INT NOT NULL,
    FOREIGN KEY (idProveedor) REFERENCES PROVEEDOR(idProveedor)
)
GO

CREATE TABLE DEVOLUCION(

    idDevolucion INT IDENTITY(1,1) PRIMARY KEY,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATETIME NOT NULL,
    razon NVARCHAR(MAX) NOT NULL,
    codigoOrden VARCHAR(9) NOT NULL
)
GO

CREATE TABLE INGRESO(

    idIngreso INT IDENTITY(1,1) PRIMARY KEY,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL
)
GO

-- MODULO CONTROL DE FLUJO --

CREATE TABLE ORDEN(

    idOrden INT IDENTITY(1,1) PRIMARY KEY,
    codigoOrden VARCHAR(9) NOT NULL UNIQUE, --Codigo unico de orden
    estadoOrden INT NOT NULL DEFAULT 1, --Cancelado 0 (Delete), Pendiente 1, En proceso 2, Listo 3, Venta 4 (no se ve en flujo)
    fechaIngreso DATE NOT NULL DEFAULT GETDATE(),--al ingresar en una nueva orden en el flujo
    tiempoEstimado DATETIME NOT NULL,
    estadoAtrasado BIT NOT NULL DEFAULT 0,
	idVehiculo INT NOT NULL,
    --FK
    --Se puede reasignar otro trabajador (update)
    idTrabajador INT,
    FOREIGN KEY (idTrabajador) REFERENCES TRABAJADOR(idTrabajador),

    --Al crear orden se ingresa cliente, pero no se puede actualizar ni borrar
    --ya que la orden es por cliente
    idCliente INT,
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente)
)
GO

-- MODULO VENTAS --

CREATE TABLE COTIZACION(

    idCotizacion INT IDENTITY(1,1) PRIMARY KEY,
    montoTotal DECIMAL(10,2) NOT NULL,
    montoManoObra DECIMAL(10,2) NOT NULL,
    tiempoEstimado VARCHAR(100) NOT NULL,
    detalles NVARCHAR(1024) NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),

    idCliente INT,
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente)

)
GO

CREATE TABLE VENTA(

    idVenta INT IDENTITY(1,1) PRIMARY KEY,

    costoReparacion DECIMAL(10,2) NOT NULL,
    fechaIngreso DATETIME NOT NULL,
    fechaSalida DATETIME NOT NULL,
    tipoPago VARCHAR(30),--credito o contado
    montoTotal DECIMAL(10,2) NOT NULL,

    idOrden INT NOT NULL,
    FOREIGN KEY (idOrden) REFERENCES ORDEN(idOrden),
 
)
GO

CREATE TABLE CUOTA (
    
    idCuota INT IDENTITY(1,1) PRIMARY KEY,
    montoTotal DECIMAL(10,2) NOT NULL,
    montoCuota DECIMAL(10,2) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaLimite DATE NOT NULL,
    numeroCuotas INT NOT NULL,
    estado VARCHAR(50) DEFAULT 'Pendiente',

    --FK
    idCliente INT NOT NULL,
    idVenta INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente) ON DELETE CASCADE,
    FOREIGN KEY (idVenta) REFERENCES VENTA(idVenta) ON DELETE CASCADE
)
GO

CREATE TABLE PAGO_CUOTA (
    idPagoCuota INT IDENTITY(1,1) PRIMARY KEY,
    numeroCuota INT NOT NULL,
    fechaVencimiento DATE NOT NULL,
    fechaPago DATE NOT NULL,
    montoPagado DECIMAL(10,2) NOT NULL,
    penalidad DECIMAL(10,2) DEFAULT 0.00,--penalidad si la fecha de pago es mayor a la de vencimiento

    idCuota INT NOT NULL,
    FOREIGN KEY (idCuota) REFERENCES CUOTA(idCuota) ON DELETE CASCADE

);
GO

CREATE TABLE NOTIFICACION(

    idNotificacion INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    cuerpo NVARCHAR(2048) NOT NULL,
    fecha DATETIME DEFAULT GETDATE() NOT NULL,
    modulo VARCHAR(50) NOT NULL,

    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)

);
GO

