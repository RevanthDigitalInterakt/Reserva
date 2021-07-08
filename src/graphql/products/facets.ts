import { gql } from '@apollo/client'

export const Facets = gql`
query Facets{
  facets(
    hideUnavailableItems:true
    selectedFacets:[
      {
        key:"c",
        value:"reserva"
        },{
          key:"c",
        value:"masculino"
        },{
          key:"c",
        value:"camisetas"
        }
    ]
  ){
    facets{
      name
      values{
        name
        key
        quantity
        range{
          from
          to
        }
      }
    }
  }
}
`