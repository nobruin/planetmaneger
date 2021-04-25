import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList ,ActivityIndicator} from 'react-native'
import { EnvirommentButton } from '../components/EnvirommentButton'
import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


export function PlanetSelect() {

    interface EnvironmentsProps {
        key: string,
        title: string
    }

    interface PlantProps {
        id: string,
        name: string,
        about: string,
        water_tips: string,
        photo: string,
        environments: [string],
        frequency: {
            times: string,
            repeat_every: string
        }
    }

    const [environments, setEnvironments] = useState<EnvironmentsProps[]>();
    const [plants, setPlants] = useState<PlantProps[]>();
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    //pagination
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false) 

    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        if(environment == 'all'){
           return setFilteredPlants(plants);   
        }

        const filtered = plants?.filter(plant => 
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;


        setLoadingMore(true);
        setPage(oldValue => oldValue +1);
        fetchPlants();

    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_page=${page}&_limit=8&_sort=name&_order=asc`)

        if(!data) 
            return setLoading(true);
           
        if(page > 1){
            setPlants(oldValue => [oldValue, ... data]);
            setFilteredPlants(oldValue => [oldValue, ... data]);
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }    
       
        setLoading(false);
        setLoadingMore(false);
    }


    useEffect(() => {
        async function fetchEnvironments() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvironments([{ key: 'all', title: 'todos' }, ...data]
            );
        }

        fetchEnvironments();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);


    if(loading)
    return (<Load />)
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subTitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    renderItem={({ item }) => (
                        <EnvirommentButton
                            title={item.title}
                            active={item.key == environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item}
                        />
                    )}
                    
                    showsVerticalScrollIndicator={false} 
                    numColumns={2}
                    contentContainerStyle={styles.plantList}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}

                    ListFooterComponent={
                        loadingMore ? 
                        <ActivityIndicator color={colors.green} /> 
                        : <></>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subTitle: {
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex:1,
        paddingHorizontal:32,
        justifyContent:'center'
    },
    plantList:{
        
    }
})