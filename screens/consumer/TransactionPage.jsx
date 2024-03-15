import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const TransactionPage = () => {
    const user = useSelector(state => state.user.value);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        fetch(`http://10.20.2.115:3000/orders/${user.token}`)
            .then(response => response.json())
            .then(orderData => {
                if (orderData.result) {
                    setOrders(orderData.orders);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des commandes :", error);
            });
    }, [user.token]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Transactions Précédentes</Text>
            {orders && console.log(orders[0])}
            {orders && orders.map(order => (

                <View key={order.date} style={styles.orderContainer}>
                    <Text style={styles.orderDate}>Date: {Date(order.date).toString()}</Text>
                    <View style={styles.orderDetails}>
                        <View>
                            <Text style={styles.orderPrice}>Prix: {order.price}</Text>
                            <Text style={styles.orderAddress}>Adresse: {order.address.street_number + ' ' + order.address.street + ' ' + order.address.zip_code + ' ' + order.address.city}</Text>
                        </View>
                        <View>
                            <Text style={styles.orderCategory}>Catégories:</Text>
                            {order.job.map(category => (
                                <Text key={category.name} style={styles.category}>{category.name}</Text>
                            ))}
                            <Text style={styles.orderTasks}>Tâches:</Text>
                            {order.task.map(task => (
                                <Text key={task.name} style={styles.task}>{task.name}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#786396', // Couleur du titre
    },
    orderContainer: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#000', // Couleur de la bordure
        paddingBottom: 20,
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderPrice: {
        fontWeight: 'bold',
    },
    orderAddress: {
        marginTop: 5,
    },
    orderCategory: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    category: {
        marginTop: 5,
        color: '#786396', // Couleur des catégories
    },
    orderTasks: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    task: {
        marginTop: 5,
        color: '#786396', // Couleur des tâches
    },
});

export default TransactionPage;