use MYM_DB;
go

--Modulo INVENTARIO

--SP listar productos con filtro
CREATE OR ALTER PROCEDURE SP_FILTRO_PRODUCTOS
(
    @nombre VARCHAR(50),
    @marca VARCHAR(50),
    @categoria VARCHAR(50),
    @stock INT,
    @precioMin DECIMAL(18,2),
	@precioMax DECIMAL(18,2)
)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    SET @SQL = 'SELECT TOP 25 * FROM PRODUCTO_SERVICIO WHERE 1=1';

    -- Condiciones para cada parametro
    IF (@nombre IS NOT NULL AND @nombre <> '')
        SET @SQL = @SQL + ' AND (nombre LIKE ''%' + @nombre + '%'' OR DIFFERENCE(nombre, ''' + @nombre + ''') >= 3)';--tolerancia a mayus, minus y errores de escritura.

    IF (@marca IS NOT NULL AND @marca <> '')
        SET @SQL = @SQL + ' AND marca = @marca';

    IF (@categoria IS NOT NULL AND @categoria <> '')
        SET @SQL = @SQL + ' AND categoria = @categoria';

    IF (@stock IS NOT NULL AND @stock > 0)
        SET @SQL = @SQL + ' AND stock <= @stock';

    IF (@precioMin IS NOT NULL AND @precioMax IS NOT NULL)
        SET @SQL = @SQL + ' AND precio BETWEEN @precioMin AND @precioMax';

    -- Ejecutar la consulta dinamica con los parametros correctamente pasados
    EXEC sp_executesql 
        @SQL, 
        N'@nombre VARCHAR(50), @marca VARCHAR(50), @categoria VARCHAR(50), @stock INT, @precioMin DECIMAL(18,2), @precioMax DECIMAL(18,2)',
        @nombre = @nombre,
        @marca = @marca,
        @categoria = @categoria,
        @stock = @stock,
        @precioMin = @precioMin,
        @precioMax = @precioMax;
END;
GO

-- SP para generar el codigo de orden
CREATE OR ALTER PROCEDURE GenerarCodigoOrden
    @CodigoOrden VARCHAR(9) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    SET @CodigoOrden = UPPER(REPLACE(CONVERT(VARCHAR(36), NEWID()), '-', ''))
    SET @CodigoOrden = LEFT(@CodigoOrden, 9)
END;
GO

-- SP para insertar la orden
CREATE OR ALTER PROCEDURE SP_INSERTAR_ORDEN
    @tiempoEstimado DATETIME,
	@idVehiculo INT,
    @idTrabajador INT,
    @idCliente INT,
	@descripcion NVARCHAR(2048)
AS
BEGIN
    DECLARE @codigoOrden VARCHAR(9)
    
    -- Genera el código único
    EXEC GenerarCodigoOrden @CodigoOrden = @codigoOrden OUTPUT

    -- Inserta la orden con el código generado
    INSERT INTO ORDEN (codigoOrden,tiempoEstimado,descripcion, idVehiculo, idTrabajador, idCliente)
    VALUES (@codigoOrden,@tiempoEstimado,@descripcion, @idVehiculo, @idTrabajador, @idCliente)
    
END;
GO

-- SP para optener lista de ordenes dentro de las columnas de fkujo
CREATE OR ALTER PROCEDURE SP_GET_ORDENES
    @estadoOrden INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        O.idOrden,
        O.codigoOrden,
		O.estadoAtrasado,
        FORMAT(DATEDIFF(DAY, GETDATE(), O.tiempoEstimado), '00') + ' días, ' +
        FORMAT(DATEDIFF(HOUR, GETDATE(), O.tiempoEstimado) % 24, '00') + ' horas, ' +
        FORMAT(DATEDIFF(MINUTE, GETDATE(), O.tiempoEstimado) % 60, '00') + ' minutos' AS TiempoRestante,
        O.descripcion,
		V.marcaVehiculo,
        V.modeloVehiculo,
        V.annoVehiculo,
        FORMAT(O.fechaIngreso, 'dd/MM/yyyy') AS fechaIngreso,
        T.nombreCompleto as nombreMecanico,
        C.nombre + ' ' + C.apellido AS nombreCliente
    FROM ORDEN O
    INNER JOIN CLIENTE_VEHICULO V ON V.idVehiculo = O.idVehiculo
    INNER JOIN CLIENTE C ON C.idCliente = O.idCliente
    INNER JOIN TRABAJADOR T ON T.idTrabajador = O.idTrabajador
    WHERE O.estadoOrden = @estadoOrden 
      AND O.estadoOrden BETWEEN 1 AND 3
    ORDER BY O.tiempoEstimado ASC;
END;
GO

--SP para cagar datos por idOrden
CREATE OR ALTER PROCEDURE GET_ORDEN
@idOrden INT
AS BEGIN
	SELECT
		O.idOrden,
		O.codigoOrden,
		O.estadoOrden,
		FORMAT(O.fechaIngreso, 'dd/MM/yyyy') AS fechaIngreso,
		FORMAT(DATEDIFF(DAY, GETDATE(), O.tiempoEstimado), '00') + ' días, ' +
		FORMAT(DATEDIFF(HOUR, GETDATE(), O.tiempoEstimado) % 24, '00') + ' horas, ' +
		FORMAT(DATEDIFF(MINUTE, GETDATE(), O.tiempoEstimado) % 60, '00') + ' minutos' AS TiempoRestante,
		FORMAT(O.tiempoEstimado, 'dd/MM/yyyy') AS tiempoEstimado,
		O.tiempoEstimado as timepoEstimadoOriginal,
		O.descripcion,
		O.estadoAtrasado,
		T.idTrabajador,
		T.nombreCompleto as nombreMecanico,
		C.nombre + ' ' + C.apellido AS nombreCliente,
		V.marcaVehiculo + ' ' + V.modeloVehiculo + ' ' + CAST(V.annoVehiculo AS VARCHAR(4)) AS vehiculo
	FROM ORDEN O
		INNER JOIN CLIENTE_VEHICULO V ON V.idVehiculo = O.idVehiculo
		INNER JOIN CLIENTE C ON C.idCliente = O.idCliente
		INNER JOIN TRABAJADOR T ON T.idTrabajador = O.idTrabajador
		WHERE O.idOrden = @idOrden
	END;
GO

