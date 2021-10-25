import { useQuery } from "@apollo/client";
import gql from "graphql-tag";


export default function Launches({ limit }){

    const GET_LAUNCHES = gql`
        query GetLaunches($limit: Int!) {
            launches(limit: $limit) {
                launch_date_utc
                launch_success
                rocket {
                    rocket_name
                }
                links {
                    video_link
                }
                details
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_LAUNCHES, {
        variables: {
            limit,
        }
    });

    if (loading) return <div><p>Loading...</p></div>
    if (error) return <div><h3>Some errors happened :(</h3><p>{error.message}</p></div>

    return(
        <div>
            <h2>Launches details:</h2>
            <ul>
            {
                data.launches.map((launch) => 
                    <li>{launch.rocket.rocket_name} | {launch.launch_date_utc} | {launch.launch_success ? "succeeded": "failed"} </li>
                )
            }
            </ul>
        </div>
    );
}