-- mock product stocks
INSERT INTO
    product_stocks (
        product_id,
        stock,
        unit,
        createdAt,
        updatedAt
    )
VALUES
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-bottle'
        ),
        100,
        'UN',
        now(),
        now()
    );

INSERT INTO
    product_stocks (
        product_id,
        stock,
        unit,
        createdAt,
        updatedAt
    )
VALUES
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-glass'
        ),
        25,
        'UN',
        now(),
        now()
    );

INSERT INTO
    product_stocks (
        product_id,
        stock,
        unit,
        createdAt,
        updatedAt
    )
VALUES
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-opener'
        ),
        32,
        'UN',
        now(),
        now()
    );