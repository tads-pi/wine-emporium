INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-bottle'
        ),
        1.5,
        now(),
        now()
    );

INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-bottle'
        ),
        5.0,
        now(),
        now()
    );

INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-bottle'
        ),
        3.5,
        now(),
        now()
    );

INSERT INTO
    product_ratings (
        uuid,
        active,
        product_id,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        (
            SELECT
                id
            FROM
                products
            WHERE
                slug = 'wine-bottle'
        ),
        4.5,
        now(),
        now()
    );