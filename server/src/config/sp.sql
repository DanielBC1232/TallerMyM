use MYM_DB;
go

--Modulo INVENTARIO

CREATE OR ALTER PROCEDURE SP_FILTRO_PRODUCTOS
(
    @nombre VARCHAR(50),
    @marca VARCHAR(50),
    @categoria VARCHAR(50),
    @stock INT,
    @rangoPrecio NVARCHAR(100)
)
AS
BEGIN
    DECLARE @precioMin DECIMAL(18,2), @precioMax DECIMAL(18,2);
    DECLARE @SQL NVARCHAR(MAX);

    -- Extraer los valores del JSON
    IF @rangoPrecio IS NOT NULL AND @rangoPrecio != ''
	BEGIN
		SELECT @precioMin = [value]
		FROM OPENJSON(@rangoPrecio)
		WHERE [key] = '0';

		SELECT @precioMax = [value]
		FROM OPENJSON(@rangoPrecio)
		WHERE [key] = '1';
	END;
    SET @SQL = 'SELECT * FROM PRODUCTO_SERVICIO WHERE 1=1';

    -- Condiciones para cada par�metro
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

    -- Ejecutar la consulta din�mica con los par�metros correctamente pasados
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

EXEC SP_FILTRO_PRODUCTOS @nombre = 'aceit', @marca = '', @categoria = '', @stock = null, @rangoPrecio = '';

