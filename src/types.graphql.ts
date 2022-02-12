import { gql } from "@apollo/client";

const CHARACTERS = gql` 
  query {
    characters(page: 2, filter: { name: "rick" }) {
        info {
          count
        }
        results {
            name,
            status,
            image,
            location {
              id,
              name
            },
        }
      }
      location(id: 1) {
        id,
        name
      }
      episodesByIds(ids: [1, 2]) {
        id
      }
  }
`;

export default CHARACTERS;