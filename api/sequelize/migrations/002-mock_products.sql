INSERT INTO
    products (
        uuid,
        active,
        name,
        slug,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        'Wine Bottle',
        'wine-bottle',
        'A bottle of red wine',
        19.99,
        now(),
        now()
    );

INSERT INTO
    products (
        uuid,
        active,
        name,
        slug,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        'Wine Glass',
        'wine-glass',
        'A stemmed glass for enjoying wine',
        9.99,
        now(),
        now()
    );

INSERT INTO
    products (
        uuid,
        active,
        name,
        slug,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES
    (
        UUID(),
        true,
        'Wine Opener',
        'wine-opener',
        'A tool for opening wine bottles',
        4.99,
        now(),
        now()
    );